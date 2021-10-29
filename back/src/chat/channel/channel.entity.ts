import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import { Message } from '../message/message.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Channel {
	@PrimaryColumn({ unique: true })
	channelName: string;

	// Config

	// @Column({unique: true })
	// channelID: Number;

	@Column({ nullable: true })
	password: string;

	@Column({ default: true })
	isPublic: boolean;

	// TMP d'abord on fait la base du channel après les users list ban etc...
	// (les arrys sont trop chiants !)

	// Users & History

	@ManyToOne(() => User, user => user.channelsUserIsOwner, {nullable: true})
	owner: User;
	
	@OneToMany(() => Message, message => message.channel, {nullable: true})
	messagesHistory: Message[];

	// Lists | Users

	@ManyToMany(() => User, user => user.channelsUserIsIn, {nullable: true})
	@JoinTable()
	admins: User[];

	@ManyToMany(() => User, user => user.channelsUserIsAdmin, {nullable: true})
	@JoinTable()
	users: User[];

	@ManyToMany(() => User, user => user.channelsUserIsBanned, {nullable: true})
	@JoinTable()
	banList: User[];

	@ManyToMany(() => User, user => user.channelsUserIsMuted, {nullable: true})
	@JoinTable()
	muteList: User[];
}
