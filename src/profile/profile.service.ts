import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { GetProfileDto, ProfileDto } from './dto/profile.dto';
import { UserService } from 'src/user/user.service';
import { LikesService } from 'src/likes/likes.service';
import { User } from 'src/user/entities/user.entity';
import * as AWS from 'aws-sdk';

@Injectable()
export class ProfileService {
  private readonly s3: AWS.S3;
  private readonly bucketName: string = process.env.AWS_BUCKET_NAME;
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => LikesService))
    private readonly likesService: LikesService,
  ) {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async getProfile(userId: number): Promise<GetProfileDto | null> {
    const profile = await this.profileRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });

    if (!profile) {
      return null;
    }
    // 내가 좋아요를 누른 사람을 찾는 로직
    const likedProjects: ProfileDto[] = [];
    const likedList = await this.userService.getLikedList(userId);
    for (const id of likedList) {
      const likedProfile = await this.profileRepository.findOneBy({ id });
      likedProjects.push(likedProfile);
    }
    // 좋아요를 누른 사람을 찾는 로직
    const likedByUsers: ProfileDto[] = [];
    const likedUserIdList = await this.likesService.getLikedUserIdList(
      profile.id,
    );
    for (const id of likedUserIdList) {
      const likedProfile = await this.profileRepository.findOne({
        where: {
          user: {
            id,
          },
        },
        relations: ['user'],
      });
      likedByUsers.push(likedProfile);
    }
    const profileData: GetProfileDto = {
      profile,
      likedProjects,
      likedByUsers,
    };
    return profileData;
  }

  async createProfile(
    userId: number,
    profileData: ProfileDto,
  ): Promise<ProfileDto> {
    const user: User = await this.userService.findOneById(userId);
    try {
      const profile = this.profileRepository.create({
        ...profileData,
        user,
      });
      return await this.profileRepository.save(profile);
    } catch (error) {
      throw new HttpException(
        'Failed to create profile. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProfile(userId: number, profileData: ProfileDto) {
    const profile = await this.profileRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
    const updatedProfile: Profile = { ...profile, ...profileData };
    try {
      return await this.profileRepository.save(updatedProfile);
    } catch (error) {
      throw new HttpException(
        'Failed to update profile. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProfileById(id: number): Promise<ProfileDto> {
    const profile = await this.profileRepository.findOne({
      where: {
        id,
      },
    });
    if (!profile) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    return profile;
  }

  async checkAndCreateUserFolder(userId: number): Promise<void> {
    const folderKey = `${userId}/`;

    try {
      const params = {
        Bucket: this.bucketName,
        Prefix: folderKey,
        MaxKeys: 1,
      };
      const data = await this.s3.listObjectsV2(params).promise();
      const exists = data.Contents?.length > 0;

      if (!exists) {
        await this.s3
          .putObject({
            Bucket: this.bucketName,
            Key: folderKey,
          })
          .promise();
      }
    } catch (error) {
      console.error(`Error checking or creating user folder: ${error}`);
      throw new Error('Unable to check or create user folder.');
    }
  }

  async fileExists(userId: number): Promise<boolean> {
    const fileKey = `${userId}/profile.png`;

    try {
      await this.s3
        .headObject({
          Bucket: this.bucketName,
          Key: fileKey,
        })
        .promise();
      return true;
    } catch (error) {
      console.log(error);
      if (error.code === 'NotFound') {
        return false;
      }
      throw error;
    }
  }

  async imageUpload(
    file: Express.Multer.File,
    userId: number,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    await this.checkAndCreateUserFolder(userId);
    const fileKey = `${userId}/profile.png`;

    return this.s3
      .upload({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: file.buffer,
        ACL: 'public-read',
      })
      .promise();
  }

  async getImage(userId: number) {
    const exists = await this.fileExists(userId);

    if (!exists) {
      throw new HttpException(
        'User profile not found in S3',
        HttpStatus.NOT_FOUND,
      );
    }
    const fileKey = `${userId}/profile.png`;

    return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
  }
}
