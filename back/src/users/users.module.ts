import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MulterModule } from '@nestjs/platform-express';
import { ChatService } from '../chat/chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  MulterModule.registerAsync({
    useFactory: () => ({
      dest: './upload',
    }),
  })
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}