import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn( {unique: true} )
  id: number;
  
  @Column({unique: true})
  userName: string;
  
  @Column({ default: true })
  isActive: boolean;

  @Column({nullable: true})
  avatar: string;

  @Column({nullable: true})
  access_token: string;
}