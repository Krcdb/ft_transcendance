import { Body, Controller, Get, Post, Delete, Param, Res} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Public } from 'src/auth/utils/public.decorator';

import { ChannelDataService } from './channel.service';
import { Channel } from './channel.entity'
import { User } from '../../users/user.entity';

import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelUserDto } from './dto/update-channel-users.dto';
import { ChannelPasswordDto } from './dto/channel-password.dto';
import { MessageController } from '../message/message.controller';
import { UsersService } from 'src/users/users.service';

@Controller('channel')
export class ChannelController {
	constructor(
		private readonly channelDataService: ChannelDataService,
	) {}

	// ------ //
	//  POST  //
	// ------ //

	@Public()
	@Post('createChannel')
	async createChannel(@Res() res, @Body() createChannelDto: CreateChannelDto) {
		if (await this.channelDataService.channelAlreadyExists(createChannelDto.channelName)) {
			return res.status(HttpStatus.CONFLICT).json({
				message: "Channel already exists"
			})
		}
		const channel = await this.channelDataService.create(createChannelDto);
		return res.status(HttpStatus.CREATED).json({
			message: "Channel has been created successfully",
			channel
		})
	}

	// a verifier comment differencier upload avec param et upload comme ça dans la barre
	// là on doit upload /42Born2Code/ID alors que dans le channelDataService on utilise data en aprametre
	// a voir comment differencier les 2 datas et update le channel

	/*
		@Public()
		@Post(':channelName/:UserID')
		async addChannelUser(@Param('channelName') channelName : string,
		@Param('UserID') UserID : number) : Promise<any> {
			return (this.channelDataService.addUserAsUser(channelName, UserID));
		}
	*/

	@Public()
	@Post(':channelName')
	async addChannelUser(@Res() res, @Param('channelName') channelName: string, @Body() UpdateChannelUserDto: UpdateChannelUserDto) :Promise<void> {
		if (await this.channelDataService.findUserInChannel(channelName, UpdateChannelUserDto.newUser)) {
			return res.status(HttpStatus.OK).json({
				message: "User already in channel"
			})
		}
		else {
			this.channelDataService.addUserAsUser(channelName, UpdateChannelUserDto.newUser);
			console.log("newUser: " + UpdateChannelUserDto.newUser);
			return (
				res.status(HttpStatus.CREATED).json ({
					message: `"User successfully added to channel !" + "channelName"`

				})
			);
		}
	}

	@Public()
	@Post(':channelName/join-private-channel')
	async UserJoinPrivateChannel(@Res() res, @Param('channelName') channelName: string, @Body() ChannelPasswordDto: ChannelPasswordDto) {
		console.log("Trying to join channel: " + channelName);
		if (!await this.channelDataService.findOne(channelName)) {
			return res.status(HttpStatus.CONFLICT).json({
				message: "Channel does not exist.",
				value: false,
			})
		}
		else if (this.channelDataService.passwordMatch(channelName, ChannelPasswordDto.password)) {
			return res.status(HttpStatus.OK).json({
				message: "Joining channel",
				value: true,
			})
		}
		else {
			return res.status(HttpStatus.CONFLICT).json({
				message: "Password does not match",
				value: false,
			})
		}
	}


	// ------ //
  	//  GET   //
  	// ------ //
	@Public()
	@Get(':channelName')
	async getChannelInfos(@Param('channelName') channelName: string) : Promise<Channel> {
		return (await this.channelDataService.findOne(channelName));
	}

	@Get(':channelName/users')
	async getUsersinChannel(@Param('channelName') channelName: string) : Promise<User[]> {
		return (await this.channelDataService.getUsersinChannel(channelName));
	}

	@Public()
	@Get(':channelName/messagesHistory')
	getChannelHistory(@Param('channelName') channelName: string) : Promise<number[]> {
		return (this.channelDataService.getMessageHistory(channelName));
	}

	@Public()
	@Get(':channelName/channel-exist')
	async channelExist(@Param('channelName') channelName: string) : Promise<any> {
		console.log("checking channel: " + channelName);

		if (await this.channelDataService.findOne(channelName))
			return (true);
		return (false);
	}

	@Public()
	@Get()
	async findAllChannels() : Promise<Channel[]> {
		return (await this.channelDataService.findAll());
	}

	@Public()
	@Get(':channelName/can-join-channel')
	async canJoinChannel(@Res() res, @Param('channelName') ChannelName: string, @Body() ChannelPasswordDto: ChannelPasswordDto) : Promise<boolean> {
		console.log("can join channel ?: " + ChannelPasswordDto.password);
		if (await this.channelDataService.passwordMatch(ChannelName, ChannelPasswordDto.password)) {
			return res.status(HttpStatus.OK).json({
				message: "Can join channel",
				value: true,
			})
		} else {
			return res.status(HttpStatus.CONFLICT).json({
				message: "Cannot join channel",
				value: false,
			})
		}
	}

	// ------- //
	//  DELETE //
	// ------- //

	@Public()
	@Delete(':channelName')
	async deleteChannel(@Param('channelName') channelName : string) {
		await this.channelDataService.deleteOne(channelName);
		return ("successfully deleted");
	}

}
