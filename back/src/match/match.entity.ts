import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.module'

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  matchId: number;

  @OneToOne(() => User)
  //@JoinColumn()
  leftPlayer: User;

  @OneToOne(() => User)
  rightPlayer: User;
}