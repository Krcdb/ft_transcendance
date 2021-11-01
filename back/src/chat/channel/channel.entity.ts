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

	// @ManyToOne(() => User, user => user.channelsUserIsOwner, {nullable: true})
	@Column("int", {nullable: true})
	owner: number;
	
	// @OneToMany(() => Message, message => message.channel, {nullable: true})
	@Column("int", {nullable: true})
	messagesHistory: number[];

	// Lists | Users

	// @ManyToMany(() => User, user => user.channelsUserIsIn, {nullable: true})
	// @JoinTable()
	@Column("int", {nullable: true})
	admins: number[];

	// @ManyToMany(() => User, user => user.channelsUserIsAdmin, {nullable: true})
	// @JoinTable()
	@Column("int", {nullable: true})
	users: number[];

	// @ManyToMany(() => User, user => user.channelsUserIsBanned, {nullable: true})
	// @JoinTable()
	@Column("int", {nullable: true})
	banList: number[];

	// @ManyToMany(() => User, user => user.channelsUserIsMuted, {nullable: true})
	// @JoinTable()
	@Column("int", {nullable: true})
	muteList: number[];
}
