import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany} from 'typeorm';
import { Message } from '../message/message.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Channel {
	@PrimaryColumn({ unique: true })
	channelName: string;

	// Config

	@Column({unique: true })
	channelID: Number;

	@Column({ nullable: true })
	password: string;

	@Column({ default: true })
	isPublic: boolean;

	// Users & History

	//@Column({ array: true, nullable: true })
	//@Column(() => Message, {array: true})
	//@Column(() => Message, {array: true})
	//@OneToMany(type => Message, message => message.message)
	@OneToMany(() => Message, message => message.message)
	messagesHistory: Message[];



	@Column({ unique: true })
	owner: Number;

	// Lists | Users

	@Column(() => User)
	adminList: User[];

	@Column(() => User)
	userList: User[];

	@Column(() => User)
	banList: User[];

	@Column(() => User)
	muteList: User[];
}

//  @HasMany(() => Photo)

// @Column("int", { array: true })
// array: number[];

// Column("text", { array: true, default: "{}" })
// tags: string[];

//   @OneToMany(type => Photo, photo => photo.user)
// photos: Photo[];

// @OneToMany(() => Photo, photo => photo.user)
// photos: Photo[];
