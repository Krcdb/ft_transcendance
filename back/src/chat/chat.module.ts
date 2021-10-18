import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { Chat } from './chat.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
	imports: [TypeOrmModule.forFeature([Chat]),
	MulterModule.registerAsync({
		useFactory: () => ({
			dest: './upload/chat',
		}),
	})
],
providers: [ChatService],
controllers: [ChatController],
})
export class ChatModule {}
