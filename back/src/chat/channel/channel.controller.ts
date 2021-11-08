import { Body, Controller, Get, Post, Delete, Param, Res} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Public } from 'src/auth/utils/public.decorator';

import { ChannelDataService } from './channel.service';
import { Channel } from './channel.entity'
import { User } from '../../users/user.entity';

import { CreateChannelDto } from './dto/create-channel.dto';
import { MessageController } from '../message/message.controller';
import { UsersService } from 'src/users/users.service';

@Controller('channel')
export class ChannelController {
	constructor(
		private readonly channelDataService: ChannelDataService,
		// private readonly usersService: UsersService
	) {}

	// ------ //
	//  POST  //
	// ------ //

	@Post()
	@Public()
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

	// ------ //
  	//  GET   //
  	// ------ //

	@Public()
	@Get()
	findAllChannels() : Promise<Channel[]> {
		return (this.channelDataService.findAll());
	}

	@Public()
	@Get(':channelName')
	getChannelInfos(@Param('channelName') channelName: string) : Promise<Channel> {
		return (this.channelDataService.findOne(channelName));
	}

	// ------- //
	//  DELETE //
	// ------- //

	@Public()
	@Delete(':channelName')
	deleteChannel(@Param('channelName') channelName : string) {
		const ret = this.channelDataService.deleteOne(channelName);
		return (ret ? "Channel: " + channelName + " deleted !" : "Channel " + channelName + " not deleted...");
	}

}
