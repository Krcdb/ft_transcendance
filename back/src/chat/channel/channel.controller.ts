import { Body, Controller, Get } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';

import { Channel } from './channel.entity'
import { User } from '../../users/user.entity';

@Controller('channel')
export class ChannelController {

	// to do in back :
	// récupérer le nombre de channel crées, leur noms etc...
	@Public()
	@Get(':channel')
	getAllChannels() {

	}
}
