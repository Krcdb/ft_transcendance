import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
// import { Date } from 
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

	// @ManyToOne(() => Channel, channel => channel.messagesHistory, {nullable: true})
	@Column("varchar", {nullable: true})
	channelName: string;

	@Column({ nullable: true })
	date: number;
	@Column({ nullable: true })
	dateStr: string;
}
