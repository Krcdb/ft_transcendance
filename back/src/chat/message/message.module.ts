import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MulterModule } from '@nestjs/platform-express';

import { Message } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { ChatModule } from '../chat.module';
import { ChannelDataService } from '../channel/channel.service';
import { UsersService } from 'src/users/users.service';

@Module({
	imports: [TypeOrmModule.forFeature([Message]), ChatModule ],
// 	MulterModule.registerAsync({
// 		useFactory: () => ({
// 			dest: './upload/message',
// 		}),
// 	})
// ],
	providers: [MessageService],
	controllers: [MessageController],
	exports: [ MessageService, ChannelDataService, UsersService ]
})
export class MessageModule {}
