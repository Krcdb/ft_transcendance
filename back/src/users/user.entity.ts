import { Entity, Column, PrimaryColumn } from 'typeorm';
// import { Match } from '../match/match.entity'

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

  // currentMatch: Match;

  @Column("int", {nullable: true, array: true})
  matchHistory: number[];

  @Column("int", {nullable: true})
  nbVictories: number;

  @Column("int", {nullable: true})
  nbLosses: number;

  @Column("int", {nullable: true})
  ladderLevel: number;

  @Column("varchar", {nullable: true, array: true})
  achievements: string[];  // ou id[] ?

    // --------------- //
    // USERS RELATIONS //
    // --------------- //

  @Column("int", {nullable: true, array: true})
  friends: number[];

  @Column("int", {nullable: true, array: true})
  blockedUsers: number[];

  @Column("int", {nullable: true, array: true})
  blockingUsers: number[];
  // ici c'est la liste des users qui ont bloqué ce user
  // -> pas sure que ce soit utile maintenant que j'ai viré les relations TypeOrm

    // --------------- //
    // CHAT & CHANNELS //
    // --------------- //
    
  @Column("varchar", {nullable: true, array: true})
  channelsUserIsOwner: string[];
  
  @Column("varchar", {nullable: true, array: true})
  channelsUserIsAdmin: string[];
  
  @Column("varchar", {nullable: true, array: true})
  channelsUserIsIn: string[];
  
  @Column("varchar", {nullable: true, array: true})
  channelsUserIsBanned: string[];
  
  @Column("varchar", {nullable: true, array: true})
  channelsUserIsMuted: string[];
  
  @Column("int", {nullable: true, array: true})
  messagesHistory: number[];
  
    // --------------- //
    // AUTHENTICATION  //
    // --------------- //

  @Column({ nullable: true })
  twoFAuthSecret?: string;

  @Column({ default: false })
  public isTwoFAuthEnabled: boolean;

}