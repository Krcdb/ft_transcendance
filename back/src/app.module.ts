import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Connection, getConnectionOptions } from 'typeorm';
// import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpExceptionFilter } from '@nestjs/common';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
    }), UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: HttpExceptionFilter
    }
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}