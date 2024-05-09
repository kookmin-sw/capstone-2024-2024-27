import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './dto/jwt-payload.dto';
import { User } from './entities/user.entity';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async createOne(newUser: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: newUser.email });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newOne = this.userRepository.create({
      email: newUser.email,
      password: newUser.password,
    });

    try {
      const newUser = await this.userRepository.save(newOne);
      await this.profileService.createProfile(newUser.id, {
        name: '',
        title: '',
        description: '',
        githubLink: '',
      });
      this.logger.log('profile created');

      this.logger.log(`User ${newOne.email} created`);
      return newOne;
    } catch (error) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(user: UserDto): Promise<User> {
    return this.userRepository.findOneBy({
      email: user.email,
      password: user.password,
    });
  }

  async getAccessToken(email: string): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOneBy({ email });
    const payload: Payload = {
      userId: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      }),
    };
  }

  async getLikedList(userId: number): Promise<number[] | []> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['likesList'],
    });
    return user.likesList.map((like) => like.profileId);
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}
