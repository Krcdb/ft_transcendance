import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MulterModule } from '@nestjs/platform-express';

import { Channel } from './channel.entity';
import { ChannelController } from './channel.controller';
import { ChannelDataService } from './channel.service';
// import { ChatModule } from '../chat.module';
// import { MessageService } from '../message/message.service';
// import { UsersService } from 'src/users/users.service';
// import { MessageModule } from '../message/message.module';
import { UsersModule } from 'src/users/users.module';
import { Message } from '../message/message.entity';
import { User } from 'src/users/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Channel, User, Message]), UsersModule ],
	providers: [ ChannelDataService ], //UsersService ],//, MessageService],
	controllers: [ ChannelController ],
	exports: [ ChannelDataService ]//, UsersService]//, MessageService ],
})
export class ChannelModule {}
