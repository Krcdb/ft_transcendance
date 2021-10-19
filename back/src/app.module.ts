import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Connection, getConnectionOptions } from 'typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
// import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { ChatService } from './chat/chat.service'
import { ChatController } from './chat/chat.controller'

@Module({
  imports: [ConfigModule.forRoot( {
    envFilePath: '.fortytwo.env',
  }),
    TypeOrmModule.forRootAsync({
    useFactory: async () =>
      Object.assign(await getConnectionOptions(), {
        autoLoadEntities: true,
      }),
  }), UsersModule,
  ChatModule,
  //  AuthModule
  ],
  controllers: [AppController, AuthController, ChatController],
  providers: [AppService, AuthService, ChatService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}