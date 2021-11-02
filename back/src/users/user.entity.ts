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

  @Column({ default: 1000 })
  elo: number;
}