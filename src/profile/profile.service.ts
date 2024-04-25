import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { GetProfileDto, ProfileDto } from './dto/profile.dto';
import { UserService } from 'src/user/user.service';
import { LikesService } from 'src/likes/likes.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly userService: UserService,
    private readonly likesService: LikesService,
  ) {}

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

    const likedProjects: ProfileDto[] = [];
    const likedList = await this.userService.getLikedList(userId);
    likedList.forEach(async (id) => {
      const likedProfile = await this.profileRepository.findOneBy({ id });
      likedProjects.push(likedProfile);
    });
    const likedByUsers: ProfileDto[] = [];
    const likedUserIdList = await this.likesService.getLikedUserIdList(
      profile.id,
    );
    likedUserIdList.forEach(async (id) => {
      const likedProfile = await this.profileRepository.findOne({
        where: {
          user: {
            id,
          },
        },
        relations: ['user'],
      });
      likedByUsers.push(likedProfile);
    });
    const profileData: GetProfileDto = {
      ...profile,
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
}
