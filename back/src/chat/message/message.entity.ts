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
	// @ManyToOne(() => User, user => user.messagesHistory, {nullable: true})
	@Column("int", {nullable: true})
	owner: number;

	@Column("varchar", { nullable: true })
	date: string;

	// @ManyToOne(() => Channel, channel => channel.messagesHistory, {nullable: true})
	@Column("varchar", {nullable: true})
	channelName: string;
}
