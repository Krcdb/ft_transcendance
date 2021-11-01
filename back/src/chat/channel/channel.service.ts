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
		// @Inject(forwardRef(() => UsersService))
		// private readonly usersService: UsersService,
		@Inject(forwardRef(() => MessageService))
		private readonly messageService: MessageService
	) {}


	// Setters

	async create(createChannelDto: CreateChannelDto): Promise <Channel> {
		const channel = new Channel();
		// faire pareil avec la liste entiere entity de channel pour en creer un
		// channel.channelID = 0; // generer id unique
		channel.channelName = createChannelDto.channelName;
		channel.password = createChannelDto.password;
		channel.isPublic = createChannelDto.isPublic;
		channel.owner = createChannelDto.owner;
		channel.messagesHistory = [];// as User[];
		channel.admins = [];// as User[];
		channel.users = [];// as User[];
		channel.banList = [];// as User[];
		channel.muteList = [];// as User[];
		// channel.users.unshift(createChannelDto.owner);
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

	async getOneChannel(channelName: string) : Promise<Channel> {
		return (this.channelRepository.findOne(channelName));
	}

	async getAllChannels() : Promise<Channel[]> {
		return (this.channelRepository.find());
	}

	// Gestion des listes d'utilisateurs

		// Ajout
	async addUserAsUser(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.users.unshift(userId);
		this.channelRepository.save(channel);
	}
	async addUserAsAdmin(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.admins.unshift(userId);
		this.channelRepository.save(channel);
	}
	async addUserAsBanned(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.banList.unshift(userId);
		this.channelRepository.save(channel);
	}
	async addUserAsMuted(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.muteList.unshift(userId);
		this.channelRepository.save(channel);
	}
		// Retrait
	async removeUserAsUser(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.users.unshift(userId);
		this.channelRepository.save(channel);
	}
	async removeUserAsAdmin(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.admins.unshift(userId);
		this.channelRepository.save(channel);
	}
	async removeUserAsBanned(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.banList.unshift(userId);
		this.channelRepository.save(channel);
	}
	async removeUserAsMuted(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.muteList.unshift(userId);
		this.channelRepository.save(channel);
	}

	// Gestion de l'historique

	async addMessageToHistory(channelName: string, messageId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.messagesHistory.unshift(messageId);
		this.channelRepository.save(channel);
	}

}
