import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  matchId: number;

  @Column("int")
  playerOne: number;

  @Column("int")
  playerTwo: number;

  @Column("int")
  scorePlayerOne: number;

  @Column("int")
  scorePlayerTwo: number;
}