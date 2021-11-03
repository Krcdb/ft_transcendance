// import { channel } from 'diagnostics_channel';
import { Entity, Column, PrimaryColumn, OneToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Channel } from 'src/chat/channel/channel.entity'
import { Message } from 'src/chat/message/message.entity';
import { Match } from '../match/match.entity'

@Entity()
export class User {

    // --------------- //
    //   USER PROFILE  //
    // --------------- //

  @PrimaryColumn( {unique: true} )
  id: number;
  
  @Column({unique: true})
  userName: string;
  
  @Column({ default: false })
  isActive: boolean;

  @Column({nullable: true})
  avatar: string;

    // -------------------- //
    // MATCHES & GAME STATS //
    // -------------------- //

  // @OneToOne(() => Match, match => match.players, {nullable: true})
  // currentMatch: Match;

  // @Column(() => Match, {nullable: true}) //doesn't compile
  @Column("int", {nullable: true, array: true})//, default: "{}" })
  matchHistory: number[];

  @Column("int", {nullable: true})
  nbVictories: number;

  @Column("int", {nullable: true})
  nbLosses: number;

  @Column("int", {nullable: true})
  ladderLevel: number;

  @Column("varchar", {nullable: true, array: true})//, default: "{}" })
  achievements: string[];  // ou id[] ?

    // --------------- //
    // USERS RELATIONS //
    // --------------- //

  // FRIENDS LIST
  // @ManyToMany(type => User, user => user.befriended, {nullable: true})
  // @JoinTable()
  @Column("int", {nullable: true, array: true})//, default: "{}" })
  friends: number[];
  // = users que ce user a ajouté en ami

  // @ManyToMany(type => User, user => user.friends, {nullable: true})
  // @Column("int", {nullable: true})
  // befriended: number[];
  // = users qui ont ajouté ce user en ami

  // BLOCKED USERS LIST
  // @ManyToMany(type => User, user => user.blockingUsers, {nullable: true})
  // @JoinTable()
  @Column("int", {nullable: true, array: true})//, default: "{}" })
  blockedUsers: number[];
  // = users que ce user a bloqué

  // @ManyToMany(type => User, user => user.blockedUsers, {nullable: true})
  @Column("int", {nullable: true, array: true})//, default: "{}" })
  blockingUsers: number[];
  // = users qui ont bloqué ce user

    // --------------- //
    // CHAT & CHANNELS //
    // --------------- //
    
  // @OneToMany(() => Channel, channel => channel.owner, {nullable: true})
  @Column("varchar", {nullable: true, array: true})//, default: "{}" })
  channelsUserIsOwner: string[];
  
  // @ManyToMany(() => Channel, channel => channel.admins, {nullable: true})
  @Column("varchar", {nullable: true, array: true})//, default: "{}" })
  channelsUserIsAdmin: string[];
  
  // @ManyToMany(() => Channel, channel => channel.users, {nullable: true})
  @Column("varchar", {nullable: true, array: true})//, default: "{}" })
  channelsUserIsIn: string[];
  
  // @ManyToMany(() => Channel, channel => channel.banList, {nullable: true})
  @Column("varchar", {nullable: true, array: true})//, default: "{}" })
  channelsUserIsBanned: string[];
  
  // @ManyToMany(() => Channel, channel => channel.muteList, {nullable: true})
  @Column("varchar", {nullable: true, array: true})//, default: "{}" })
  channelsUserIsMuted: string[];
  
  // @OneToMany(() => Message, message => message.owner, {nullable: true})
  @Column("int", {nullable: true, array: true})//, default: "{}" })
  messagesHistory: number[];
  
  @Column({ nullable: true })
  twoFAuthSecret?: string;

  @Column({ default: false })
  public isTwoFAuthEnabled: boolean;

}