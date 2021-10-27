import { Body, Controller, Get, Delete, Post, Res } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';

import { Message } from './message.entity'
import { Channel } from '../channel/channel.entity'
import { User } from '../../users/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class MessageController {

	// to do in back :
	// récupérer le nombre de message crées, leur noms etc...
	@Public()
	@Get(':message')
	getAllChannels() {

	}

	@Public()// get all messages in DB
	@Get()
  	findAll(): Promise<Message[]> {
	return this.messageService.findAll();
	}
	
	@Public()  // get one message by its id
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Message> {
		return this.messageService.findOne(id);
	}

	@Public()  // get all messages of a user by its id
	@Get(':owner/')
	findOne(@Param('owner') owner: User): Promise<Message> {
		return this.messageService.findAllByUser(owner);
	}

	@Public()
	@Post('chat')
	async addUser(@Res() res, @Body() createMessageDto: CreateMessageDto) {
		const msg = await this.messageService.create(createMessageDto);
		return res.status(HttpStatus.CREATED).json({
			message: "Message has been created successfully",
			msg
		})
	}	

	@Delete(':id')
  	remove(@Param('id') id: number): Promise<void> {
		return this.messageService.remove(id);
	}
}
