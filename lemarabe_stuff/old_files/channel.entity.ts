// import { User } from 'src/users/user.entity';
// import { Message } from './message.entity'
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, JoinColumn } from 'typeorm';

// @Entity()
// export class Channel {
//   @PrimaryGeneratedColumn()
//   channelId: number;

//   @Column("bool")
//   isPublic: boolean;

//   @Column({nullable: true})
//   password: string;

//   @ManyToOne(() => User, user => user.channelsUserIsOwner)
//   owner: User;

//   @ManyToMany(() => User, user => user.channelsUserIsAdmin)
//   admins: User[];

//   @ManyToMany(() => User, user => user.channelsUserIsIn)
//   users: User[];

//   @ManyToMany(() => User, user => user.channelsUserIsBanned)
//   banList: User[];

//   @ManyToMany(() => User, user => user.channelsUserIsMuted)
//   muteList: User[];

//   @OneToMany(() => Message, message => message.channel)
//   messageHistory: Message[];

// }