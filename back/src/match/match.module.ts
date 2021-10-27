import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
// import { ChatService } from '../chat/chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  providers: [MatchService],
  controllers: [MatchController],
  exports: [MatchService]
})
export class MatchModule {}