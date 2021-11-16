import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './channel.entity';
import { User } from '../../users/user.entity';
import { CreateChannelDto } from './dto/create-channel.dto';

import { UsersService } from 'src/users/users.service';
import { MessageService } from '../message/message.service';

import { Socket, Server } from "socket.io";
import { WebsocketService } from "src/websocket/websocket.service";

@Injectable()
export class ChannelDataService {
	constructor(
		@InjectRepository(Channel)
		private readonly channelRepository: Repository<Channel>,
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService,
		@Inject(forwardRef(() => WebsocketService))
		private readonly socketService: WebsocketService,
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
	async findUserInChannel(channelName: string, userID: number) : Promise<number> {
		const channel = await this.findOne(channelName);
		const found = channel.users.find(element => element === userID);
		return found;
	}

	/////////////////////////////////////////
	//  Gestion des listes d'utilisateurs  //
  	/////////////////////////////////////////

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

	async getMessageHistory(channelName: string) : Promise<any> {
		const channel = await this.channelRepository.findOne(channelName);
		return (channel.messagesHistory);
	}

  	////////////////////////////////
	//  DESTRUCTION DES CHANNELS  //
  	////////////////////////////////

	async deleteOne(channelName : string) : Promise<any> {
		const channel = await this.channelRepository.findOne(channelName);
		this.channelRepository.delete(channel);
		if (!channel)
			return (true);
		return (false);
	}

  	////////////////////////////////
	//  	  JOIN CHANNEL 	 	  //
  	////////////////////////////////

	async passwordMatch(channelName: string, password: string) : Promise<boolean> {
		const channel = await this.channelRepository.findOne(channelName);
		if (!channel)
			return (false);
		else if (channel.password === password)
			return (true);
		return (false);
	}

  	////////////////////////////////
	// 			 SOCKETS  		  //
  	////////////////////////////////

	// todo
	//
	// - add socket user when connected to channel
	// - destory socket user when disconnect to channel
	// - join socket user


	//userSockets: Socket = new Map<Socket, string>();

	async addSocketUser(socket: Socket, channelName: string) {
		//if (this.userSockets.has(socket)) {
		//	console.log("SOCKET : User Already in channel !");
		//} else {
		//	console.log("SOCKET : User Join Channel");
		//	this.userSockets.set(socket, channelName);
		//}

	//	if (this.userSockets.indexOf(socket) == -1) {
		//	this.userSockets.push(socket);
		//	console.log("SOCKET : User Join Channel");
		//}
		//else
		//	console.log("SOCKET : User Already in channel !");
	}

	//	async get

	async refreshChannelMessages(server: Server, socket: Socket, channelName: string) : Promise<any> {
		const allUsers = (await this.findOne(channelName)).users as Array<number>;

		for (let index = 0; index < allUsers.length; index++) {
			const element = allUsers[index];
			console.log("User: " + element);
			const currentSocket = await this.socketService.getSocketFromUserId(element);
			if (currentSocket) {
				console.log("Socket send to user: " + element);
				currentSocket.emit('refreshChannelMessages');
			} else {
				console.log("socket: for ID : " + element + " is null");
			}
		}
		return (true);
	}
}
