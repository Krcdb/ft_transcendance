import { Body, Controller, Get, Delete, Post, Res, Param } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common';
import { Public } from 'src/auth/utils/public.decorator';

import { Message } from './message.entity'
import { MessageService } from './message.service'
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	// ------ // 
  	//  POST  //
	// ------ //
	  
	@Public()
	@Post(':channelName/')
	async postMessageOnChannel(@Param('channelName') channelName: string,
		@Res() res, @Body() createMessageDto: CreateMessageDto) {	
		const msg = await this.messageService.create(createMessageDto, channelName);
		if (msg == null)
			return res.status(HttpStatus.NOT_FOUND).json({
				message: "Couldn't find channel with given name" });
		await this.messageService.addMessageToHistories(msg.id);
		return res.status(HttpStatus.CREATED).json({
			message: "Message has been created successfully",
			msg
		})
	}

	// ------ // 
	//   GET  //
	// ------ // 

	@Public()// get all messages from a channel
	@Get(':channelName/msg')
	async findAll(@Param('channelName') channelName: string): Promise<Message[]> {
		return await this.messageService.findAllInChannel(channelName);
	}
	
	@Public()  // get one message by its id
	@Get(':id')
	async findOne(@Param('id') id: number): Promise<Message> {
		return await this.messageService.findOne(id);
	}

	@Public()  // get all messages of a user by its id
	@Get(':owner/')
	async findAllByUserId(@Param('owner') ownerId: number): Promise<Message[]> {
		return await this.messageService.findAllByUser(ownerId);
	}

	// ------- // 
	//  DELETE //
	// ------- // 

	@Delete(':id')
  	async remove(@Param('id') id: number): Promise<void> {
		return await this.messageService.remove(id);
	}
}
