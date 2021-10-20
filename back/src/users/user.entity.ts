import { Entity, Column, PrimaryColumn, OneToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Match } from '../match/match.entity'

@Entity()
export class User {

  // USER PROFILE
  @PrimaryColumn( {unique: true} )
  userName: string;

  @Column({nullable: true})
  intraId: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({nullable: true})
  avatar: string;

  // MATCHES & GAME STATS
  @OneToOne(() => Match, match => match.players)
  currentMatch: Match;

  @Column(() => Match)
  matchHistory: Match[];

  @Column("int")
  nbVictories: number;

  @Column("int")
  nbLosses: number;

  @Column("int")
  ladderLevel: number;

  // FRIENDS LIST
  @ManyToMany(type => User, user => user.befriended)
  @JoinTable()
  friends: User[];
  // = users que ce user a ajouté en ami

  @ManyToMany(type => User, user => user.friends)
  befriended: User[];
  // = users qui ont ajouté ce user en ami

  // BLOCKED USERS LIST
  @ManyToMany(type => User, user => user.blockingUsers)
  @JoinTable()
  blockedUsers: User[];
  // = users que ce user a bloqué

  @ManyToMany(type => User, user => user.blockedUsers)
  blockingUsers: User[];
  // = users qui ont bloqué ce user

}