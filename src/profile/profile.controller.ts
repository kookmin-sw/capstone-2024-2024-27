import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/user/user.guard';
import { GetUser } from 'src/user/decorators/GetUser.decorator';
import { Payload } from 'src/user/dto/jwt-payload.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetProfileDto, ProfileDto } from './dto/profile.dto';

@Controller('profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:id')
  async getProfile(
    @Param('id') id: number,
    @GetUser() user: Payload,
  ): Promise<{ profile: GetProfileDto | null }> {
    if (id !== user.userId) {
      throw new ForbiddenException(
        'You do not have permission to access this profile',
      );
    }
    return { profile: await this.profileService.getProfile(id) };
  }

  @Post('/:id')
  async createProfile(
    @Param('id') id: number,
    @GetUser() user: Payload,
    @Body() newProfile: ProfileDto,
  ): Promise<ProfileDto> {
    if (id !== user.userId) {
      throw new ForbiddenException(
        'You do not have permission to create a profile for this user',
      );
    }
    return await this.profileService.createProfile(id, newProfile);
  }

  @Put('/:id')
  async updateProfile(
    @Param('id') id: number,
    @GetUser() user: Payload,
    @Body() profile: ProfileDto,
  ): Promise<ProfileDto> {
    if (id !== user.userId) {
      throw new ForbiddenException(
        'You do not have permission to update this profile',
      );
    }
    return await this.profileService.updateProfile(id, profile);
  }
}
