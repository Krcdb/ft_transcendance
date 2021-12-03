import { ChannelService } from './channel.service';
import { Channel } from './channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelUserDto } from './dto/update-channel-users.dto';
import { ChannelPasswordDto } from './dto/channel-password.dto';
import { ChannelsAndOwnersDto } from './dto/channels-and-owners';
import { User } from 'src/users/user.entity';
import { IdDto } from 'src/users/dto/id.dto';
export declare class ChannelController {
    private readonly channelService;
    constructor(channelService: ChannelService);
    createChannel(res: any, createChannelDto: CreateChannelDto): Promise<any>;
    updateChannelAdmin(res: any, channelName: string, updateChannelUserDto: UpdateChannelUserDto): Promise<any>;
    updateChannelMuteList(res: any, channelName: string, updateChannelUserDto: UpdateChannelUserDto): Promise<any>;
    updateChannelBanList(res: any, channelName: string, updateChannelUserDto: UpdateChannelUserDto): Promise<any>;
    addUserAsKicked(res: any, channelName: string, idDto: IdDto): Promise<any>;
    addChannelUser(res: any, channelName: string, updateChannelUserDto: UpdateChannelUserDto): Promise<void>;
    findAllChannels(): Promise<Channel[]>;
    findAllPublicChannels(): Promise<ChannelsAndOwnersDto>;
    findAllUserChannels(userId: number): Promise<ChannelsAndOwnersDto>;
    getChannelInfos(channelName: string): Promise<Channel>;
    getUsersinChannel(channelName: string): Promise<User[]>;
    getChannelHistory(channelName: string): Promise<number[]>;
    channelExist(channelName: string): Promise<any>;
    getBanList(channelName: string): Promise<User[]>;
    canJoinChannel(res: any, channelName: string, channelPasswordDto: ChannelPasswordDto): Promise<any>;
    deleteChannel(channelName: string): Promise<string>;
}
