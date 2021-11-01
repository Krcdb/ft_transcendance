// import { User } from 'src/users/user.entity';
// import { Channel } from './channel.entity'
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

// @Entity()
// export class Message {
//   @PrimaryGeneratedColumn()
//   messageId: number;

//   @Column("timestamp", {nullable: true})
//   dateTime: number;
  
//   @Column("varchar", {nullable: true})
//   content: string;

//   @ManyToOne(() => User, user => user.messagesSent, {nullable: true})
//   // @JoinColumn()
//   author: User;

//   @ManyToOne(() => Channel, channel => channel.messageHistory, {nullable: true})
//   // @JoinColumn()
//   channel: Channel;
// }