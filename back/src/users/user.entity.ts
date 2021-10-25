// import { channel } from 'diagnostics_channel';
import { Entity, Column, PrimaryColumn, OneToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Channel } from 'src/chat/channel.entity'
import { Message } from 'src/chat/message.entity';
import { Match } from '../match/match.entity'

@Entity()
export class User {

    // --------------- //
    //   USER PROFILE  //
    // --------------- //

  @PrimaryColumn( {unique: true} )
  userName: string;

  @Column({unique: true})
  intraId: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({nullable: true})
  avatar: string;

    // -------------------- //
    // MATCHES & GAME STATS //
    // -------------------- //

  @OneToOne(() => Match, match => match.players, {nullable: true})
  currentMatch: Match;

  // @Column(() => Match, {nullable: true}) //doesn't compile
  @Column( {nullable: true})
  matchHistory: Match[];

  @Column("int", {nullable: true})
  nbVictories: number;

  @Column("int", {nullable: true})
  nbLosses: number;

  @Column("int", {nullable: true})
  ladderLevel: number;

  @Column("varchar", {nullable: true})
  achievements: string[];  // ou id[] ?

    // --------------- //
    // USERS RELATIONS //
    // --------------- //

  // FRIENDS LIST
  @ManyToMany(type => User, user => user.befriended, {nullable: true})
  @JoinTable()
  friends: User[];
  // = users que ce user a ajouté en ami

  @ManyToMany(type => User, user => user.friends, {nullable: true})
  befriended: User[];
  // = users qui ont ajouté ce user en ami

  // BLOCKED USERS LIST
  @ManyToMany(type => User, user => user.blockingUsers, {nullable: true})
  @JoinTable()
  blockedUsers: User[];
  // = users que ce user a bloqué

  @ManyToMany(type => User, user => user.blockedUsers, {nullable: true})
  blockingUsers: User[];
  // = users qui ont bloqué ce user

    // --------------- //
    // CHAT & CHANNELS //
    // --------------- //
    
  @OneToMany(() => Channel, channel => channel.owner, {nullable: true})
  channelsUserIsOwner: Channel[];
  
  @ManyToMany(() => Channel, channel => channel.admins, {nullable: true})
  channelsUserIsAdmin: Channel[];
  
  @ManyToMany(() => Channel, channel => channel.users, {nullable: true})
  channelsUserIsIn: Channel[];
  
  @ManyToMany(() => Channel, channel => channel.banList, {nullable: true})
  channelsUserIsBanned: Channel[];
  
  @ManyToMany(() => Channel, channel => channel.muteList, {nullable: true})
  channelsUserIsMuted: Channel[];
  
  @OneToMany(() => Message, message => message.author, {nullable: true})
  messagesSent: Message[];
  
}