import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly githubLink: string;
}

export class GetProfileDto extends ProfileDto {
  @Type(() => ProfileDto)
  likedByUsers: ProfileDto[] | [];

  @Type(() => ProfileDto)
  likedProjects: ProfileDto[] | [];
}
