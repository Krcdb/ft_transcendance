import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column("int")
  playerOne: number;

  @Column("int")
  playerTwo: number;

  @Column("int")
  scorePlayerOne: number;

  @Column("int")
  scorePlayerTwo: number;
}