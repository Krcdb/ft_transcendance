import { Body, Controller, Get } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common';
import { Public } from 'src/auth/utils/public.decorator';

import { Message } from './message.entity'
import { Channel } from '../channel/channel.entity'
import { User } from '../../users/user.entity';

@Controller('message')
export class MessageController {

	// to do in back :
	// récupérer le nombre de message crées, leur noms etc...
	@Public()
	@Get(':message')
	getAllChannels() {
		
	}
}
