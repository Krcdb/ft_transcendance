//import { User } from './User';

export default interface Channel {
	channelName: string;
	isPublic: boolean;
	// password: string; //shouldn't be in the front (maybe a bool instead like "isProtected")
	isProtected: boolean;
	owner: number;
	messagesHistory: number[];
	admins: number[];
	users: number[];
	banList: number[];
	muteList: number[];
}
