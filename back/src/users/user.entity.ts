import { Entity, Column, PrimaryColumn } from 'typeorm';

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

  @Column("varchar", {nullable: true, array: true})
  matchHistory: string[];

  @Column("int", {nullable: true})
  nbVictories: number;

  @Column("int", {nullable: true})
  nbLosses: number;

  @Column("int", {nullable: true, default : 1000})
  ladderLevel: number;

  @Column("int", {nullable: true, array: true})
  achievements: number[];

    // --------------- //
    // USERS RELATIONS //
    // --------------- //

  @Column("int", {nullable: true, array: true})
  friends: number[];

  @Column("int", {nullable: true, array: true})
  blockedUsers: number[];

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
  
    // -------------------------- //
    // TWO FACTOR AUTHENTICATION  //
    // -------------------------- //

  @Column({ nullable: true })
  twoFAuthSecret?: string;

  @Column({ default: false })
  public isTwoFAuthEnabled: boolean;

}