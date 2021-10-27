import { User } from '../../../users/user.entity';

export class CreateChannelDto {
	channelName: string;
	isPublic: boolean;
	password: string;
	owner: User;
}
