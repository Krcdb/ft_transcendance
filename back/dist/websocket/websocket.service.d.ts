import { Server, Socket } from "socket.io";
import { Channel } from 'src/chat/channel/channel.entity';
export declare class WebsocketService {
    server: Server;
    deleteOldSocket(userId: number, page: string): Promise<any>;
    getSocketFromUserId(userId: number, page: string): Promise<Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap>>;
    getSocketFromUserIdNoPage(userId: number): Promise<Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap>>;
    printAllSocketsFromPage(userId: number, page: string): Promise<any>;
    getSocketsFromChannel(channel: Channel): Promise<Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap>[]>;
}
