import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Likes } from './entities/likes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    private readonly likesRepository: Repository<Likes>,
  ) {}
  async getLikedUserIdList(profileId: number): Promise<number[] | []> {
    const likesList = await this.likesRepository.find({
      where: { profileId },
      relations: ['user'],
    });
    return likesList.map((like) => like.user.id);
  }
}
