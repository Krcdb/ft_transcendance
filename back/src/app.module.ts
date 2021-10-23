import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ChannelModule } from './chat/channel/channel.module';
import { MessageModule } from './chat/message/message.module';
import { Connection, getConnectionOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
        useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
            autoLoadEntities: true,
        }),

    }), UsersModule, ChannelModule, MessageModule, AuthModule], // add channel module
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
