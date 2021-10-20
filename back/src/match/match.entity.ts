import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column OneToOne, JoinColumn } from 'typeorm';
// import { User } from '../users/users.module'

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  matchId: number;

  @OneToOne(() => User, user => user.currentMatch)
  @JoinColumn()
  players: User[];

  @Column("int")
  scores: number[];

  @Column("float")
  barPosition: number[];

  // SOLUTION 1
  @Column("float")
  ballPosition: number[];
  //avec x = ballPosition[0] && y = ballPosition[1]

  // SOLUTION 2
  // @Column("float")
  // ballPositionX: number;
  // @Column("float")
  // ballPositionY: number;
}