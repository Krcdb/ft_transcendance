import { User } from "src/users/user.entity";
import { Channel } from "../channel.entity";
export declare class ChannelsAndOwnersDto {
    channels: Channel[];
    owners: User[];
}
