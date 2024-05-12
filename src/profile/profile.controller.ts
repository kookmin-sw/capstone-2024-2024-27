import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/user/user.guard';
import { GetUser } from 'src/user/decorators/GetUser.decorator';
import { Payload } from 'src/user/dto/jwt-payload.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GetProfileDto, ProfileDto } from './dto/profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:profileId')
  @ApiParam({
    name: 'profileId',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Get a profile',
    type: ProfileDto,
  })
  async getProfileById(@Param('profileId') id: number): Promise<ProfileDto> {
    return await this.profileService.getProfileById(id);
  }

  @Post('/image')
  @UseInterceptors(FileInterceptor('image'))
  async postProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: Payload,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    return this.profileService.imageUpload(file, user.userId);
  }

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Get a profile',
    type: GetProfileDto,
  })
  async getProfile(@GetUser() user: Payload): Promise<GetProfileDto | null> {
    return await this.profileService.getProfile(user.userId);
  }

  @Put('/')
  @ApiBody({
    description: 'Create a profile',
    type: ProfileDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Update a profile',
    type: ProfileDto,
  })
  async updateProfile(
    @GetUser() user: Payload,
    @Body() profile: ProfileDto,
  ): Promise<ProfileDto> {
    return await this.profileService.updateProfile(user.userId, profile);
  }
}
