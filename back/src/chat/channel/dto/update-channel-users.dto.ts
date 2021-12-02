import { IsNumber, IsBoolean } from 'class-validator';

export class UpdateChannelUserDto {
    @IsNumber()
    user: number;

    @IsBoolean()
    toAdd: boolean;
}