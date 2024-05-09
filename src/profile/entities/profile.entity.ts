import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'userId' })
  @Exclude({ toPlainOnly: true })
  user: User;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  githubLink: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  constructor(partial: Partial<Profile>) {
    Object.assign(this, partial);
  }
}
