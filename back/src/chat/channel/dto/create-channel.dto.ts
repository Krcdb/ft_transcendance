// import { User } from '../../../users/user.entity';

export class CreateChannelDto {
	channelName: string;
	password: string;
	isPublic: boolean;
	owner: number;
}
