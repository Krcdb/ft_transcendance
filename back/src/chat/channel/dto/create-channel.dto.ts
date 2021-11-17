import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateChannelDto {
	@IsString()
	@IsNotEmpty()
	channelName: string;

	@IsString()
	//@IsNotEmpty()  ca depend de comment on veut gerer l'absence de mdp, soit on laisse le champ a null, soit string vide ""
	password: string;

	@IsBoolean()
	isPublic: boolean;

	@IsNumber()
	owner: number;
}
