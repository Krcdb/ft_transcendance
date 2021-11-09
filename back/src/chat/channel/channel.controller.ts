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

	@Public()
	@Post()
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
	// a verifier comment differencier upload avec param et upload comme ça dans la barre
	// là on doit upload /42Born2Code/ID alors que dans le channelDataService on utilise data en aprametre
	// a voir comment differencier les 2 datas et update le channel

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
	@Post(':channelName/:UserID')
	async addChannelUser(@Param('channelName') channelName : string,
	@Param('UserID') UserID : number) : Promise<any> {
		return (this.channelDataService.addUserAsUser(channelName, UserID));
	}

	@Public()
	@Get(':channelName')
	getChannelInfos(@Param('channelName') channelName: string) : Promise<Channel> {
		return (this.channelDataService.findOne(channelName));
	}

	@Public()
	@Get()
	findAllChannels() : Promise<Channel[]> {
		return (this.channelDataService.findAll());
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

	