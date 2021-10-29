import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '../../users/user.entity';
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

    create(createMessageDto: CreateMessageDto) : Promise<Message> {
        const message = new Message();
        message.message = createMessageDto.message;
        message.owner = createMessageDto.owner;
        message.date = createMessageDto.date;
        message.channel = createMessageDto.channel;
        
        return this.messageRepository.save(message);
    }

    async findOne(id: number): Promise<Message> {
        const user = this.messageRepository.findOne(id);
        return user;
    }

    async findAll(): Promise<Message[]> {
        return this.messageRepository.find();
    }
    async findAllByUser(owner: User): Promise<Message[]> {
        return this.messageRepository.find({ owner: owner });
    }
    // async findAllByUser(ownerId: number): Promise<Message[]> {
    //     return this.messageRepository.find({ owner: owner });
    // }

    async remove(id: number): Promise<void> {
        await this.messageRepository.delete(id);
    }

    async addMessageToHistories(id: number) : Promise<void> {
        const message = await this.messageRepository.findOne(id);
        this.usersService.addMessageToHistory(message);
        this.channelService.addMessageToHistory(message);
	}
}
