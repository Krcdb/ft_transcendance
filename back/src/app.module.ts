import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Connection, getConnectionOptions } from 'typeorm';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async () =>
      Object.assign(await getConnectionOptions(), {
        autoLoadEntities: true,
      }),
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
  // providers: [
  //   {
  //     provide: AppService,
  //     useClass: HttpException
  //   }
  // ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}