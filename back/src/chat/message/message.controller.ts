import { Body, Controller, Get, Delete, Post, Res, Param, Inject } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';

import { Message } from './message.entity'
import { MessageService } from './message.service'
import { UsersService } from '../../users/users.service'
import { Channel } from '../channel/channel.entity'
import { ChannelDataService } from '../channel/channel.service'
import { User } from '../../users/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}
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
	findAllByUserId(@Param('owner') ownerId: number): Promise<Message[]> {
		return this.messageService.findAllByUser(ownerId);
	// findAllByUserId(@Param('owner') ownerId: number, usersService: UsersService): Promise<Message[]> {
	// 	const owner = usersService.findOne(ownerId);
	// 	return this.messageService.findAllByUser(owner);
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
