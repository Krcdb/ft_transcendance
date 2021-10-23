import { Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';
import * as fs from 'fs';

@Injectable()
export class ChannelDataService {
	constructor(@InjectRepository(Channel)
		private readonly channelRepository: Repository<Channel>,
	) {}


	// Setters

	async create(createChannelDto: CreateChannelDto): Promise <Channel> {
		const channel = new Channel();

		channel.channelName = createChannelDto.channelName;
		channel.isPublic = createChannelDto.isPublic;
		channel.password = createChannelDto.password;
		channel.owner = createChannelDto.owner;

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
