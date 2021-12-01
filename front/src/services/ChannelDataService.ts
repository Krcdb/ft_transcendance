/* eslint-disable */
import http from "@/http-common";
import Channel from "@/types/Channel";
import CreateChannel from "@/types/CreateChannel";
// import { CreateChannelDto } f

class ChannelDataService {

    // CHANNEL
    createChannel(channel: CreateChannel) : Promise<any> {
        return http.post('/channel/createChannel', channel);
    }
    getAllActiveUser() : Promise <any> {
        return http.get('/users/');
    }
    getAllChannels() : Promise<any> {
        return http.get(`/channel`);
    }
    getAllPublicChannels() : Promise<any> {
        return http.get(`/channel/public`);
    }
    getAllUserChannel(userId: number): Promise<any> {
        return http.get(`/channel/user/${userId}`);
    }
    getChannel(channelName : string) : Promise<any> {
        return http.get(`/channel/infos/${channelName}`);
    }
    getAllUsersInChannel(channelName : string) : Promise<any> {
        return http.get(`/channel/users/${channelName}`);
    }
    deleteChannel(channelName : string) : Promise<any> {
        return http.delete(`/channel/${channelName}`);
    }
    updateChannelUser(channelName : string, data: any) : Promise<any> {
        return http.post(`/channel/add-user/${channelName}`, data);
    }
    getMessagesInChannel(channelName : string) : Promise<any> {
        return http.get(`/channel/messagesHistory${channelName}`);
    }
    addUserToAdmin(channelName: string, data: any) : Promise<any> {
        return http.post(`/channel/add-admin/${channelName}`, data);
    }
    removeUserFromAdmin(channelName: string, data: any) : Promise<any> {
        return http.post(`/channel/remove-admin/${channelName}`, data);
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

    channelExist(channelName: string) : Promise<any> {
        return http.get(`/channel/channel-exist/${channelName}`);
    }

    // a retirer
    canJoinChannel(channelName: string, channelPassword: any) : Promise<any> {
        return http.get(`channel/can-join-channel/${channelName}`, channelPassword);
    }

    JoinPrivateChannel(channelName: string, channelPassword: any) : Promise<any> {
        return http.post(`/channel/join-private-channel/${channelName}`, channelPassword);
    }
}

export default new ChannelDataService();
