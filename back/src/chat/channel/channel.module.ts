import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Channel } from './channel.entity';
import { ChannelController } from './channel.controller';
import { ChannelDataService } from './channel.service';

import { UsersModule } from 'src/users/users.module';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
	imports: [
		forwardRef(() => TypeOrmModule.forFeature([Channel])),
		forwardRef(() => UsersModule),
		forwardRef(() => WebsocketModule),
	],
	providers: [ ChannelDataService ],
	controllers: [ ChannelController ],
	exports: [ ChannelDataService ]
})
export class ChannelModule {}
