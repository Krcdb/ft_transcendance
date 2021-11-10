import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

export enum GameState {
  WAITING_ALL = 'waiting_all',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
}

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  matchId: string;

  @Column({ enum: GameState, type: 'enum', default: GameState.WAITING_ALL })
  state: GameState;

  @Column("int", {nullable: true})
  players: number[];

  @Column("int", {nullable: true})
  scores: number[];
}