import { Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';

import { User } from '../../users/user.entity';

import * as fs from 'fs';

@Injectable()
export class ChannelDataService {
	constructor(@InjectRepository(Channel)
		private readonly channelRepository: Repository<Channel>,
	) {}


	// Setters

	async create(createChannelDto: CreateChannelDto): Promise <Channel> {
		const channel = new Channel();

		// faire pareil avec la liste entiere entity de channel pour en creer un


		console.log("channelID: " + channel.channelID);
		console.log("channelName: " + channel.channelName);
		console.log("isPublic: " + channel.isPublic);
		console.log("password: " + channel.password);
		console.log("owner: " + channel.owner);


		channel.channelID = createChannelDto.channelID; // generer id unique
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

}
