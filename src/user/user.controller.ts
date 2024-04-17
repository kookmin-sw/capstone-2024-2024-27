import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  async login(@Body() body: UserDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(body);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.userService.getAccessToken(user.email);
  }

  @Post('signup')
  @ApiResponse({ status: 201, description: 'User created' })
  async singup(@Body() body: CreateUserDto) {
    return await this.userService.createOne(body);
  }
}
