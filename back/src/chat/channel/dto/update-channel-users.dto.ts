import { IsNumber } from 'class-validator';

export class UpdateChannelUserDto {
    @IsNumber()
    newUser: number;
}
