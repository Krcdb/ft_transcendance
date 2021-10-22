import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Channel } from '../channel/channel.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Message {
	@PrimaryColumn()
	message: string;

	// Config
	@Column()
	owner: User;

	@Column({ nullable: true })
	date: string;

	@Column({ unique: true })
	channelOwner: Channel;
}
