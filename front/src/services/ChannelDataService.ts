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

    addChannelUser(channelName : string, id : number) : Promise<any> {
        return http.post(`channel/${channelName}`, id);
    }

}

export default new ChannelDataService();
