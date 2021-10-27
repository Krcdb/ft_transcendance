import { User } from '../../../users/user.entity';
import { Channel } from '../../channel/channel.entity';

export class CreateMessageDto {
    message: string;
    owner: User;
    date: string;
    channel: Channel;
}