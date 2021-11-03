import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UsersService } from '../../users/users.service';
import { ChannelDataService } from '../channel/channel.service';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        @Inject(forwardRef(() => ChannelDataService))
        private readonly channelService: ChannelDataService
    ) {}

    async create(createMessageDto: CreateMessageDto, channelName: string) : Promise<Message> | null {
        if (await this.channelService.channelAlreadyExists(channelName) == false)
            return null;
        const message = new Message();
        message.channelName = channelName;
        message.owner = createMessageDto.owner;
        message.message = createMessageDto.message;
        // message.date = Date.now();
        message.dateStr = Date.now().toString();
        return this.messageRepository.save(message);
    }

    //////////////////////////////
    //  Gestion des messages    //
    //////////////////////////////

    async addMessageToHistories(msgId: number) : Promise<void> {
        const message = await this.messageRepository.findOne(msgId);
        this.usersService.addMessageToHistory(message.owner, message.id);
        this.channelService.addMessageToHistory(message.channelName, message.id);
    }

    async remove(msgId: number): Promise<void> {
        await this.messageRepository.delete(msgId);
    }

    //////////////////////////////
    //  Recherche de messages   //
    //////////////////////////////

    async findOne(msgId: number): Promise<Message> {
        return this.messageRepository.findOne(msgId);
    }
    async findAll(): Promise<Message[]> {
        return this.messageRepository.find();
    }
    async findAllByUser(ownerId: number): Promise<Message[]> {
        return this.messageRepository.find({ owner: ownerId });
    }
    async findAllInChannel(channelName: string): Promise<Message[]> {
        return this.messageRepository.find({ channelName: channelName });
    }
}
