import { Injectable} from "@nestjs/common"
import { Server, Socket} from "socket.io"

@Injectable()
export class WebsocketService {
	server: Server;

	async getSocketFromUserId(userId: number) {
		const allSockets = this.server.of('/').sockets as Map<string, Socket>;
    	for (const s of allSockets) {
      		const socket = s[1];
			if (socket.data.user?.id == userId)
				return socket;
    	}
		return null;
	}
}