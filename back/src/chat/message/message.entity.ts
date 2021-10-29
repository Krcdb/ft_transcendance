import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Channel } from '../channel/channel.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Message {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	message: string;

	// Config
	@ManyToOne(() => User, user => user.messagesSent, {nullable: true})
	owner: User;

	@Column({ nullable: true })
	date: string;

	@ManyToOne(() => Channel, channel => channel.messagesHistory, {nullable: true})
	channel: Channel;
}
