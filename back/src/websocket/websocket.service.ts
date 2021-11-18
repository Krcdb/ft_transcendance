import { Injectable} from "@nestjs/common";
import { Server, Socket} from "socket.io";

import { Channel } from 'src/chat/channel/channel.entity';

@Injectable()
export class WebsocketService {
	server: Server;

	async getSocketFromUserId(userId: number, page: string) {
		const allSockets = this.server.of('/').sockets as Map<string, Socket>;
    	for (const s of allSockets) {
      		const socket = s[1];
			if (socket.data.user?.id == userId){
				if (socket.data.page == page)
					return socket;
			}
    	}
		return null;
	}

	async printAllSocketsFromPage(userId: number, page: string) {
		const allSockets = this.server.of('/').sockets as Map<string, Socket>;
    	for (const s of allSockets) {
      		const socket = s[1];
			if (socket.data.user?.id == userId) {
				if (socket.data.page == page)
					console.log(`socket found for ${page} : ${userId}`);
			}
    	}
		return null;
	}

  	////////////////////////////////
	// 			 CHANNEL  		  //
  	////////////////////////////////

	async getSocketsFromChannel(channel: Channel) {
		const allSockets = await this.server.of('/').sockets as Map<string, Socket>;
		let filteredSockets = Array<Socket>();
		for (const s of allSockets) {
			const socket = s[1];
			if (channel.users.find(socket.data.user?.id))
				filteredSockets.push(socket);
		}
		return (filteredSockets);
	}
}
