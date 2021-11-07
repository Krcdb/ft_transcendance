/* eslint-disable */
import http from "@/http-common";
// import Channel from "@/types/Channel";
// import { CreateChannelDto } f

class ChannelDataService {
    createChannel(channel: Channel) : Promise<any> {
        return http.post('/chat', channel);
    }

    getAllActiveUser() : Promise <any> {
        return http.get('/users/');
    }

    getAllChannels() : Promise<any> {
        return http.get("/channel");
    }
}

export default new ChannelDataService();
