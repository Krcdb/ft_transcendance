import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { UsersModule } from '../users/users.module';
// import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match]), UsersModule],
  providers: [MatchService],
  controllers: [MatchController],
  exports: [MatchService]
})
export class MatchModule {}