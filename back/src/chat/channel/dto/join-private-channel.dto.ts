import { IsString } from 'class-validator';

export class JoinPrivateChannelDto{
	@IsString()
	password: string;
}
