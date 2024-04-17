import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './dto/jwt-payload.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
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
      await this.userRepository.save(newOne);

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
}
