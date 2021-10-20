import { User } from 'src/users/user.entity';
import { Channel } from './channel.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  messageId: number;

  @Column("timestamp")
  dateTime: number;
  
  @Column("varchar")
  content: string;

  @ManyToOne(() => User, user => user.messagesSent)
  // @JoinColumn()
  author: User;

  @ManyToOne(() => Channel, channel => channel.messageHistory)
  // @JoinColumn()
  channel: Channel;
}