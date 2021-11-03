import { User } from './User';

export default interface Channel {
	channelName: string;
	isPublic: boolean;
	password: string;
	owner: User;
}
