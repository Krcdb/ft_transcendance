import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

import { UsersModule } from 'src/users/users.module';
import { ChannelModule } from '../channel/channel.module';

@Module({
	imports: [TypeOrmModule.forFeature([Message]), UsersModule, ChannelModule ],
	providers: [ MessageService],
	controllers: [ MessageController ],
	exports: [ MessageService ]
})
export class MessageModule {}
