import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UpdateUserNameDto } from './dto/update-userName.dto';
import { IdDto } from './dto/id.dto';
import { AchievementsInterface } from 'src/achievements/achievements';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    addUser(res: any, createUserDto: CreateUserDto): Promise<any>;
    updateUserName(res: any, id: number, updateUserNameDto: UpdateUserNameDto): Promise<User>;
    uploadAvatar(res: any, id: number, file: any): Promise<User>;
    addFriend(res: any, id: number, idDto: IdDto): Promise<any>;
    addBlock(res: any, id: number, idDto: IdDto): Promise<any>;
    removeFriend(res: any, id: number, idDto: IdDto): Promise<any>;
    removeBlocked(res: any, id: number, idDto: IdDto): Promise<any>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findAllPlayers(id: number): Promise<User[]>;
    getAchievements(id: number): Promise<AchievementsInterface[]>;
    getFriends(id: number): Promise<User[]>;
    getBlocked(id: number): Promise<User[]>;
    getUsersexceptBlocked(id: number): Promise<User[]>;
    logout(id: number): Promise<User>;
    serveAvatar(id: number, res: any): Promise<any>;
    serveAchievImage(class_name: string, res: any): Promise<any>;
    remove(id: number): Promise<void>;
    removeAvatar(id: number): Promise<void>;
}
