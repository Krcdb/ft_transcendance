import { User } from '../../../users/user.entity';

export class CreateChannelDto {
	channelID: number;
	channelName: string;
	isPublic: boolean;
	password: string;
	owner: number;
}
