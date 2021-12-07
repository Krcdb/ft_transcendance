import { IsString, IsBoolean } from 'class-validator';

export class UpdatePasswordDto {
	@IsString()
	password: string;

	@IsBoolean()
	toAdd: boolean;
}
