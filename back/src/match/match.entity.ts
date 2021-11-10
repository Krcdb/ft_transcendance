import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  matchId: number;

  @Column("int", {nullable: true})
  players: number[];

  @Column("int", {nullable: true})
  scores: number[];
}