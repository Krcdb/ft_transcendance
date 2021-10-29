import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MulterModule } from '@nestjs/platform-express';
// import { ChatService } from '../chat/chat.service';
// import { ChatModule } from '../chat/chat.module';
import { ChannelDataService } from 'src/chat/channel/channel.service';
import { MessageService } from 'src/chat/message/message.service';
import { Match } from 'src/match/match.entity';
import { Channel } from 'src/chat/channel/channel.entity';
import { Message } from 'src/chat/message/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Match, Channel, Message]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    })
  ],
  providers: [ UsersService ], //ChannelDataService, MessageService ],
  controllers: [ UsersController ],
  exports: [ UsersService ]//, ChannelDataService, MessageService ]
})
export class UsersModule {}