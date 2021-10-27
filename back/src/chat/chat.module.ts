import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelModule } from './channel/channel.module';
import { ChannelDataService } from './channel/channel.service';
import { MessageModule } from './message/message.module';
import { MessageService } from './message/message.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service';

// import { ChatController } from './chat.controller';
// import { ChatService } from './chat.service';

@Module({
	imports: [ ChannelModule, MessageModule, UsersModule ],
	providers: [ ChannelDataService, MessageService ],//[ ChatService ],
	//controllers: [ ChatController ],
	exports: [ ChannelDataService, MessageService, UsersService ]
	//exports: [ ChatService, ChannelModule, MessageModule ]
})
export class ChatModule {}
