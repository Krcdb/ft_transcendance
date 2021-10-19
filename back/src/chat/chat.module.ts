import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { Chat } from './chat.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

import { UsersService } from '../users/users.service';

@Module({
	imports: [TypeOrmModule.forFeature([Chat]),
	MulterModule.registerAsync({
		useFactory: () => ({
			dest: './upload/chat',
		}),
	}),
	UsersService
],
providers: [ChatService, UsersService],
controllers: [ChatController],
})
export class ChatModule {}
