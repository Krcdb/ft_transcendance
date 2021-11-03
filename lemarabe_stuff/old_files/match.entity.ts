import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
// import { User } from '../users/users.module'

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  matchId: number;

  // @OneToOne(() => User, user => user.currentMatch, {nullable: true})
  // @JoinColumn()
  @Column("int", {nullable: true})
  players: number[];

  @Column("int", {nullable: true})
  scores: number[];

  // @Column("float", {nullable: true})
  // barPosition: number[];

  // SOLUTION 1
  // @Column("float", {nullable: true})
  // ballPosition: number[];
  //avec x = ballPosition[0] && y = ballPosition[1]

  // SOLUTION 2
  // @Column("float")
  // ballPositionX: number;
  // @Column("float")
  // ballPositionY: number;
}