import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Channel } from './channel.entity';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [TypeOrmModule.forFeature([Channel]), UsersModule ],
	providers: [ ChannelService ],
	controllers: [ ChannelController ],
	exports: [ ChannelService ]
})
export class ChannelModule {}
