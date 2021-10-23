export class CreateChannelDto {
	channelName: string;
	isPublic: boolean;
	password: string;
	owner: Number;		//Owner = Owner ID
}
