import { forwardRef, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';

import { User } from '../../users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Message } from '../message/message.entity';
import { MessageService } from '../message/message.service';

import * as fs from 'fs';

@Injectable()
export class ChannelDataService {
	constructor(
		@InjectRepository(Channel)
		private readonly channelRepository: Repository<Channel>,
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService,
		@Inject(forwardRef(() => MessageService))
		private readonly messageService: MessageService
	) {}


	// Setters

	async create(createChannelDto: CreateChannelDto): Promise <Channel> {
		const channel = new Channel();

		// faire pareil avec la liste entiere entity de channel pour en creer un


		// channel.channelID = 0; // generer id unique
		channel.channelName = createChannelDto.channelName;
		channel.isPublic = createChannelDto.isPublic;
		channel.password = createChannelDto.password;
		channel.owner = createChannelDto.owner;

		//channel.adminList = [] as User[];
		//channel.userList = [] as User[];
		//channel.banList = [] as User[];
		//channel.muteList = [] as User[];

		// new Array<orderItem>();

		return (this.channelRepository.save(channel));
	}


	// Getters

	async channelAlreadyExist(createChannelDto: CreateChannelDto): Promise<any> {
		const channel = await this.channelRepository.findOne({ channelName: createChannelDto.channelName });
		if (channel)
			return (true);
		return (false);
	}

	async getAllChannel() : Promise<Channel[]> {
		return (this.channelRepository.find());
	}

	async addUserAsAdmin(channelName: string, user: User) : Promise<void> {
		const channel = await this.channelRepository.findOne({channelName: channelName});
		channel.admins.unshift(user);
		this.channelRepository.save(channel);
	}

	async addMessageToHistory(message: Message) : Promise<void> {
		message.channel.messagesHistory.unshift(message);
	}

}
