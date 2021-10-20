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

  @Column("varchar")
  achievements: string[];  // ou id[] ?

    // --------------- //
    // USERS RELATIONS //
    // --------------- //

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

    // --------------- //
    // CHAT & CHANNELS //
    // --------------- //
    
  @OneToMany(() => Channel, channel => channel.owner)
  channelsUserIsOwner: Channel[];
  
  @ManyToMany(() => Channel, channel => channel.admins)
  channelsUserIsAdmin: Channel[];
  
  @ManyToMany(() => Channel, channel => channel.users)
  channelsUserIsIn: Channel[];
  
  @ManyToMany(() => Channel, channel => channel.banList)
  channelsUserIsBanned: Channel[];
  
  @ManyToMany(() => Channel, channel => channel.muteList)
  channelsUserIsMuted: Channel[];
  
  @OneToMany(() => Message, message => message.author)
  messagesSent: Message[];
  
}