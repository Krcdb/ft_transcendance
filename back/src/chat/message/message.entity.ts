import { Entity, Column, PrimaryColumn, ManyToOne} from 'typeorm';
import { Channel } from '../channel/channel.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Message {
	@PrimaryColumn()
	message: string;

	// Config
	@Column(() => User)
	owner: User;

	@Column({ nullable: true })
	date: string;

	//@ManyToOne(() => Channel, channel => channel.messagesHistory)
	//channel: Channel;
}
