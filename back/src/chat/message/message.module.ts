import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { Message } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
	imports: [TypeOrmModule.forFeature([Message]),
	MulterModule.registerAsync({
		useFactory: () => ({
			dest: './upload/message',
		}),
	})
],
providers: [MessageService],
controllers: [MessageController],
})
export class MessageModule {}
