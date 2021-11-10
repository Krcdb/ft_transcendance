import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChannelService {
	constructor(
		@InjectRepository(Channel)
		private readonly channelRepository: Repository<Channel>,
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService,
	) {}

	async create(createChannelDto: CreateChannelDto): Promise <Channel> {
		const channel = new Channel();
		channel.channelName = createChannelDto.channelName;
		channel.password = createChannelDto.password;
		channel.isPublic = createChannelDto.isPublic;
		channel.owner = createChannelDto.owner;
		channel.messagesHistory = [];
		channel.admins = [];
		channel.users = [];
		channel.banList = [];
		channel.muteList = [];
		channel.users.push(createChannelDto.owner);
		await this.usersService.addToChannelOwner(createChannelDto.owner, createChannelDto.channelName);
		await this.usersService.addToChannelUsers(createChannelDto.owner, createChannelDto.channelName);
		return (await this.channelRepository.save(channel));
	}

	/////////////////////////////////////////
  	//  Recherche et gestion des channels  //
  	/////////////////////////////////////////

	async findOne(channelName: string) : Promise<Channel> {
		return (await this.channelRepository.findOne(channelName));
	}
	async findAll() : Promise<Channel[]> {
		return (await this.channelRepository.find());
	}
	async findAllPublicChannels() : Promise<Channel[]> {
		return (await this.channelRepository.find({isPublic: true}));
	}
	async findAllPrivateChannels() : Promise<Channel[]> {
		return (await this.channelRepository.find({isPublic: false}));
	}
	async channelAlreadyExists(channelName: string): Promise<any> {
		const channel = await this.channelRepository.findOne(channelName);
		if (channel)
			return (true);
		return (false);
	}
	
	/////////////////////////////////////////
	//  Gestion des listes d'utilisateurs  //
  	/////////////////////////////////////////

		// Ajout
	async addUserAsUser(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.users.push(userId);
		await this.channelRepository.save(channel);
	}
	async addUserAsAdmin(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.admins.push(userId);
		await this.channelRepository.save(channel);
	}
	async addUserAsBanned(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.banList.push(userId);
		await this.channelRepository.save(channel);
	}
	async addUserAsMuted(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.muteList.push(userId);
		await this.channelRepository.save(channel);
	}
	
		// Retrait
	async removeUserAsUser(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.users.splice(channel.users.indexOf(userId));
		await this.channelRepository.save(channel);
	}
	async removeUserAsAdmin(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.admins.splice(channel.admins.indexOf(userId));
		await this.channelRepository.save(channel);
	}
	async removeUserAsBanned(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.banList.splice(channel.banList.indexOf(userId));
		await this.channelRepository.save(channel);
	}
	async removeUserAsMuted(channelName: string, userId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.muteList.splice(channel.muteList.indexOf(userId));
		await this.channelRepository.save(channel);
	}
		// Changement d'owner  // (owner ne peut pas etre null)
	async changeOwner(channelName: string, newOwnerId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		await this.usersService.removeFromChannelOwner(channel.owner, channelName);
		await this.usersService.addToChannelOwner(newOwnerId, channelName);
		await this.channelRepository.update(channelName, {owner: newOwnerId});
	}

  	////////////////////////////////
	//  Gestion de l'historique   //
  	////////////////////////////////

	async addMessageToHistory(channelName: string, messageId: number) : Promise<void> {
		const channel = await this.channelRepository.findOne(channelName);
		channel.messagesHistory.push(messageId);
		await this.channelRepository.save(channel);
	}

}
