import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions, getRepository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
<<<<<<< HEAD
import { WebsocketModule } from './websocket/websocket.module';
import { GameModule } from './game/game.module';

@Module({
  	imports: [ConfigModule.forRoot({isGlobal: true,}),
=======
import { MatchModule } from './match/match.module';
import { ChannelModule } from './chat/channel/channel.module';
import { MessageModule } from './chat/message/message.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
>>>>>>> master
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
      }),
    }),
<<<<<<< HEAD
	UsersModule,
	AuthModule,
	WebsocketModule,
	GameModule,
	],
  	controllers: [],
  	providers: [],
=======
    UsersModule,
    AuthModule,
    MatchModule,
    ChannelModule, 
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> master
})
export class AppModule {
  constructor(private connection: Connection) {}
}
