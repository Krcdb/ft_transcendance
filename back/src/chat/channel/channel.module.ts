import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MulterModule } from '@nestjs/platform-express';

import { Channel } from './channel.entity';
import { ChannelController } from './channel.controller';
import { ChannelDataService } from './channel.service';
import { ChatModule } from '../chat.module';
import { MessageService } from '../message/message.service';
import { UsersService } from 'src/users/users.service';

@Module({
	imports: [TypeOrmModule.forFeature([Channel]), ChatModule ],
	providers: [ChannelDataService],
	controllers: [ChannelController],
	exports: [ChannelDataService, MessageService, UsersService ],
})
export class ChannelModule {}
