import { Body, Controller, Get, Post, Delete, Param, Res} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Public } from 'src/auth/utils/public.decorator';

import { ChannelDataService } from './channel.service';
import { Channel } from './channel.entity'
import { User } from '../../users/user.entity';

import { CreateChannelDto } from './dto/create-channel.dto';
import { MessageController } from '../message/message.controller';
import { UsersService } from 'src/users/users.service';

@Controller('chat')
export class ChannelController {
	constructor(
		private readonly channelDataService: ChannelDataService,
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

	// Get Default Channel Page
	// @Public()
	// @Get()
	// test() : string {
	// 	let string;

	// 	string = "Welcome to channel Backend page !";
	// 	string += "<br><br>List of all Channel: <br><br>"
	// 	string += this.channelDataService.findAll();
	// 	return (string);
	// }

	@Public()
	@Get(':channelName')
	async getChannelInfos(@Param('channelName') channelName: string) : Promise<Channel> {
		return (await this.channelDataService.findOne(channelName));
	}

	@Public()
	@Get()
	async findAllChannels() : Promise<Channel[]> {
		return (await this.channelDataService.findAll());
	}

	// ------- // 
	//  DELETE //
	// ------- // 

}

	