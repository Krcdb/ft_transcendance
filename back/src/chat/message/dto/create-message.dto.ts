// import { User } from '../../../users/user.entity';
// import { Channel } from '../../channel/channel.entity';

export class CreateMessageDto {
    message: string;
    owner: number;
    channel: string;
}