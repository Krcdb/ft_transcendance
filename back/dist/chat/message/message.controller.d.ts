import { Message } from './message.entity';
import { MessageService } from './message.service';
import { ChannelService } from '../channel/channel.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessageController {
    private readonly messageService;
    private readonly channelService;
    constructor(messageService: MessageService, channelService: ChannelService);
    postMessageOnChannel(channelName: string, res: any, createMessageDto: CreateMessageDto): Promise<any>;
    findAll(): Promise<Message[]>;
    findAllInChannel(channelName: string): Promise<Message[]>;
    findOne(id: number): Promise<Message>;
    findAllByUserId(ownerId: number): Promise<Message[]>;
    remove(id: number): Promise<void>;
}
