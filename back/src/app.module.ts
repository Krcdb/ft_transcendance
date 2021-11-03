import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Connection, getConnectionOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WebsocketModule } from './websocket/websocket.module';
import { GameModule } from './game/game.module';

@Module({
  	imports: [ConfigModule.forRoot({isGlobal: true,}),
    TypeOrmModule.forRootAsync({
    useFactory: async () =>
      Object.assign(await getConnectionOptions(), {
        autoLoadEntities: true,
      }),
    }),
	UsersModule,
	AuthModule,
	WebsocketModule,
	GameModule,
	],
  	controllers: [],
  	providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}