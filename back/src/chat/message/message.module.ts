import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MulterModule } from '@nestjs/platform-express';
import { Message } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
// import { ChatModule } from '../chat.module';
// import { ChannelDataService } from '../channel/channel.service';
// import { UsersService } from 'src/users/users.service';
import { ChannelModule } from '../channel/channel.module';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/user.entity';
import { Channel } from '../channel/channel.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Message, User, Channel]),
		UsersModule, ChannelModule],
	providers: [ MessageService],//ChannelDataService, UsersService ],
	controllers: [ MessageController ],
	exports: [ MessageService]//, ChannelDataService, UsersService ]
})
export class MessageModule {}
