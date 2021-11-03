import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Channel } from './channel.entity';
import { ChannelController } from './channel.controller';
import { ChannelDataService } from './channel.service';

import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [TypeOrmModule.forFeature([Channel]), UsersModule ],
	providers: [ ChannelDataService ],
	controllers: [ ChannelController ],
	exports: [ ChannelDataService ]
})
export class ChannelModule {}
