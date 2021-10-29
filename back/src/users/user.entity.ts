import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn( {unique: true} )
  id: number;
  
  @Column({unique: true})
  userName: string;
  
  @Column({ default: false })
  isActive: boolean;

  @Column({nullable: true})
  avatar: string;

  @Column({ nullable: true })
  twoFAuthSecret?: string;

  @Column({ default: false })
  public isTwoFAuthEnabled: boolean;

}