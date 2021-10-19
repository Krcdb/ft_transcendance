import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Match } from '../match/match.entity'

@Entity()
export class User {
  @PrimaryColumn( {unique: true} )
  userName: string;

  @Column({nullable: true})
  intraId: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({nullable: true})
  avatar: string;

  @OneToMany()
  matchHistory: Match[];

  // @Column()
  // nbVictories: number;

  // @Column()
  // nbLosses: number;

  // @Column()
  // ladderLevel: number;

  @OneToMany(() => User, user => user.)
  friendsList: User[];

  @ManyToOne()

}