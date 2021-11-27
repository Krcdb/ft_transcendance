import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChannelService } from '../channel/channel.service';
export declare class MessageService {
    private readonly messageRepository;
    private readonly channelService;
    constructor(messageRepository: Repository<Message>, channelService: ChannelService);
    create(createMessageDto: CreateMessageDto, channelName: string): Promise<Message> | null;
    addMessageToHistories(message: Message): Promise<void>;
    remove(msgId: number): Promise<void>;
    findOne(msgId: number): Promise<Message>;
    findAll(): Promise<Message[]>;
    findAllByUser(ownerId: number): Promise<Message[]>;
    findAllInChannel(channelName: string): Promise<Message[]>;
}
