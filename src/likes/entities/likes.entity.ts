import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @ManyToOne(() => User, (user) => user.likesList)
  @ApiProperty({
    type: () => User,
  })
  user: User;

  @Column()
  @ApiProperty({
    example: 1,
    description: 'Profile ID',
    type: 'number',
  })
  profileId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Exclude()
  updatedAt: Date;
}
