import { Body, Controller, Get, Param, Post, Delete, Res} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Public } from 'src/auth/utils/public.decorator';

import { ChannelDataService } from './channel.service';
import { Channel } from './channel.entity'
import { User } from '../../users/user.entity';

import { CreateChannelDto } from './dto/create-channel.dto';

@Controller('channel')
export class ChannelController {
	constructor(private readonly channelDataService: ChannelDataService) {}

	// POST

	// Create Channel
	@Post()
	@Public()
	async createChannel(@Res() res, @Body() createChannelDto: CreateChannelDto) {
		if (await this.channelDataService.channelAlreadyExist(createChannelDto)) {
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

	// GET

	// Get Default Channel Page
	@Public()
	@Get()
	test() : string {
		let string = "";

		//string = "Welcome to channel Backend page !";
		//string += "<br><br>List of all Channel: <br><br>"
		let chan : Promise<Channel[]>

		chan = this.findAllChannel();

		//string += this.findAllChannel();

		string += chan[0].channelID;
		return (string);
	}


	@Public()
	@Get()
	findAllChannel() : Promise<Channel[]> {
		return (this.channelDataService.getAllChannel());
	}

}
