/* eslint-disable */
import http from "@/http-common";
//import Channel from "@/types/Channel";

class ChannelDataService {
    createChannel(data: any) : Promise<any> {
        return http.post('/channel', data);
    }
    getAllActiveUser() : Promise <any> {
        return http.get('/users/');
    }
    getAllChannels() : Promise<any> {
        return http.get(`/channel`);
    }
    getChannel(channelName : string) : Promise<any> {
        return http.get(`/channel/${channelName}`);
    }
    getAllUsersInChannel(channelName : string) : Promise<any> {
        return http.get(`/channel/${channelName}`);
    }
    deleteChannel(channelName : string) : Promise<any> {
        return http.delete(`channel/${channelName}`);
    }
}

export default new ChannelDataService();
