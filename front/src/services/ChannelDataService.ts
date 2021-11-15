/* eslint-disable */
import http from "@/http-common";
import Channel from "@/types/Channel";
// import { CreateChannelDto } f

class ChannelDataService {

    // CHANNEL

    createChannel(channel: Channel) : Promise<any> {
        return http.post('/channel/createChannel', channel);
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
    addChannelUser(channelName : string, id : any) : Promise<any> {
        return http.post(`channel/${channelName}`, id);
    }

    getMessagesInChannel(channelName : string) : Promise<any> {
        return http.get(`channel/${channelName}/messagesHistory`);
    }

    // MESSAGES

    getMessagesFromChannel(channelName : string) : Promise<any> {
        return (http.get(`messages/${channelName}/msg`));
    }
    getMessageFromChannel(channelName: string, id : any) : Promise<any> {
        return http.get(`messages/${channelName}/msg/`, id);
    }

    sendMessageToChannel(channelName: string, message: any) : Promise<any> {
        return http.post(`messages/${channelName}`, message);
    }

    // CONDITIONS

    JoinPrivateChannel(channelName: string, channelPassword: any) : Promise<any> {
        return http.post(`channel/${channelName}/join-private-channel`, channelPassword);
    }

}

export default new ChannelDataService();
