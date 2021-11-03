/* eslint-disable */
import http from "@/http-common";
import Channel from "@/types/Channel";

class ChannelDataService {
    createChannel(channel: Channel) : Promise<any> {
        return http.post('/channel', channel);
    }

    getAllActiveUser() : Promise <any> {
        return http.get('/users/');
    }

    getAllChannels() : Promise<any> {
        return http.get("/channel");
    }
}

export default new ChannelDataService();
