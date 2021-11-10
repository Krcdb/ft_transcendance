import { forwardRef, Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { WebsocketModule } from 'src/websocket/websocket.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    forwardRef(() => WebsocketModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
