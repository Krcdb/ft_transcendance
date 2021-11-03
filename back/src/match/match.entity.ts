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