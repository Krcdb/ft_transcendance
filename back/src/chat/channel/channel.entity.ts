import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Message } from '../message/message.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Channel {
	@PrimaryColumn({ unique: true })
	channelName: string;

	// Config

	@Column({unique: true })
	channelID: number[];

	@Column({ nullable: true })
	password: string;

	@Column({ default: true })
	isPublic: boolean;

	// Users & History

	@Column({ nullable: true })
	messagesHistory: Message[];

	@Column({ unique: true })
	owner: string;

	// Lists | Users

	@Column({ nullable: true })
	adminList: User[];

	@Column({ nullable: true })
	userList: User[];

	@Column({ nullable: true })
	banList: User[];

	@Column({ nullable: true })
	muteList: User[];
}
