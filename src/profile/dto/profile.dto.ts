import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'KMUlee',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'capstone',
  })
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'This is a capstone project.',
  })
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'https://github.com/KMUlee',
  })
  readonly githubLink: string;
}

export class GetProfileDto extends ProfileDto {
  @Type(() => ProfileDto)
  @ApiProperty({
    type: [ProfileDto],
  })
  likedByUsers: ProfileDto[] | [];

  @Type(() => ProfileDto)
  @ApiProperty({
    type: [ProfileDto],
  })
  likedProjects: ProfileDto[] | [];
}
