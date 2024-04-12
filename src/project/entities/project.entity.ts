import { Exclude } from 'class-transformer';
import { Likes } from 'src/likes/entities/likes.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  photo: string;

  @ManyToMany(() => User, (user) => user.projects)
  userId: User;

  @OneToMany(() => Likes, (likes) => likes.projectId)
  likes: Likes[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Exclude()
  updatedAt: Date;
}
