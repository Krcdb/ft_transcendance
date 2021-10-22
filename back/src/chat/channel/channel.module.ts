import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { Channel } from './channel.entity';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

@Module({
	imports: [TypeOrmModule.forFeature([Channel]),
	MulterModule.registerAsync({
		useFactory: () => ({
			dest: './upload/channel',
		}),
	})
],
providers: [ChannelService],
controllers: [ChannelController],
})
export class ChannelModule {}
