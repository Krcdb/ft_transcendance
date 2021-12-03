import { ChannelService } from './channel.service';
import { Channel } from './channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelUserDto } from './dto/update-channel-users.dto';
import { ChannelPasswordDto } from './dto/channel-password.dto';
import { ChannelsAndOwnersDto } from './dto/channels-and-owners';
import { User } from 'src/users/user.entity';
export declare class ChannelController {
    private readonly channelService;
    constructor(channelService: ChannelService);
    createChannel(res: any, createChannelDto: CreateChannelDto): Promise<any>;
    addChannelUser(res: any, channelName: string, UpdateChannelUserDto: UpdateChannelUserDto): Promise<void>;
    findAllChannels(): Promise<Channel[]>;
    findAllPublicChannels(): Promise<ChannelsAndOwnersDto>;
    findAllUserChannels(userId: number): Promise<ChannelsAndOwnersDto>;
    getChannelInfos(channelName: string): Promise<Channel>;
    getUsersinChannel(channelName: string): Promise<User[]>;
    getChannelHistory(channelName: string): Promise<number[]>;
    channelExist(channelName: string): Promise<any>;
    canJoinChannel(res: any, channelName: string, channelPasswordDto: ChannelPasswordDto): Promise<any>;
    deleteChannel(channelName: string): Promise<string>;
}
