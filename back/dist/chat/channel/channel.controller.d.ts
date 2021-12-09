import { ChannelService } from './channel.service';
import { Channel } from './channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChannelPasswordDto } from './dto/channel-password.dto';
import { ChannelsAndOwnersDto } from './dto/channels-and-owners';
import { IdDto } from 'src/users/dto/id.dto';
import { UpdatePasswordDto } from 'src/chat/channel/dto/update-password.dto';
export declare class ChannelController {
    private readonly channelService;
    constructor(channelService: ChannelService);
    createChannel(res: any, createChannelDto: CreateChannelDto): Promise<any>;
    canJoinChannel(res: any, channelName: string, channelPasswordDto: ChannelPasswordDto): Promise<any>;
    updateChannelAdmin(res: any, channelName: string, updateUserDto: UpdateUserDto): Promise<any>;
    updateChannelOwner(res: any, channelName: string, updateUserDto: UpdateUserDto): Promise<any>;
    updateChannelMuteList(res: any, channelName: string, updateUserDto: UpdateUserDto): Promise<any>;
    updateChannelBanList(res: any, channelName: string, updateUserDto: UpdateUserDto): Promise<any>;
    addUserAsKicked(res: any, channelName: string, idDto: IdDto): Promise<any>;
    updateChannelPassword(res: any, channelName: string, updatePasswordDto: UpdatePasswordDto): Promise<any>;
    addChannelUser(res: any, channelName: string, updateUserDto: UpdateUserDto): Promise<void>;
    findAllChannels(): Promise<Channel[]>;
    findAllPublicChannels(): Promise<ChannelsAndOwnersDto>;
    findAllUserChannels(userId: number): Promise<ChannelsAndOwnersDto>;
    getChannelInfos(res: any, channelName: string): Promise<any>;
    getUsersinChannel(channelName: string): Promise<any>;
    getChannelHistory(channelName: string): Promise<number[]>;
    channelExist(channelName: string): Promise<any>;
    getBanList(channelName: string): Promise<any>;
    deleteChannel(channelName: string): Promise<string>;
}
