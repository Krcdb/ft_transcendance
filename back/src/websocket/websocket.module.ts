import { forwardRef, Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';
import { UsersModule } from 'src/users/users.module';
import { GameModule } from 'src/game/game.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => GameModule),
  ],
  providers: [WebsocketGateway, WebsocketService],
  exports: [WebsocketService],
})
export class WebsocketModule {}
