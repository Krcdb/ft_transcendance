import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '../../users/user.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
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

    async remove(id: number): Promise<void> {
        await this.messageRepository.delete(id);
    }
}
