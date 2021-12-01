import { IsNumber, IsBoolean } from 'class-validator';

export class UpdateChannelUserDto {
    @IsNumber()
    user: number;

    @IsBoolean()
    isjoining: boolean;
}
