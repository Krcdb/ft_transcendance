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

	// TMP d'abord on fait la base du channel après les users list ban etc...
	// (les arrys sont trop chiants !)

	// Users & History

	//@OneToMany(() => Message, message => message.message)
	//messagesHistory: Message[];

	@Column(() => User)
	owner: User;

	// Lists | Users

	//@Column(() => User)
	//adminList: User[];

	//@Column(() => User)
	//userList: User[];

	//@Column(() => User)
	//banList: User[];

	//@Column(() => User)
	//muteList: User[];
}
