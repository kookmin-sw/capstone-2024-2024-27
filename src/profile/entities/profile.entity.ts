import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;
}
