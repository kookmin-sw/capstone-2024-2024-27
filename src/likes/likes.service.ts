import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Likes } from './entities/likes.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    private readonly likesRepository: Repository<Likes>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  async getLikedUserIdList(profileId: number): Promise<number[] | []> {
    const likesList = await this.likesRepository.find({
      where: { profileId },
      relations: ['user'],
    });
    return likesList.map((like) => like.user.id);
  }

  async likeProfile(profileId: number, userId: number): Promise<Likes> {
    const user: User = await this.userService.findOneById(userId);
    const newLike: Likes = this.likesRepository.create({
      profileId,
      user,
    });
    try {
      return await this.likesRepository.save(newLike);
    } catch (error) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
