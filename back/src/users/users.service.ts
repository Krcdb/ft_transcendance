import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserNameDto } from './dto/update-userName.dto';
import { User } from './user.entity';
import { Message } from '../chat/message/message.entity';
import { Match } from '../match/match.entity'
import { Channel } from '../chat/channel/channel.entity'
import * as fs from 'fs';
import { ChannelDataService } from '../chat/channel/channel.service';
import { MessageService } from '../chat/message/message.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    // @Inject(forwardRef(() => ChannelDataService))
    // private readonly channelService: ChannelDataService,
    // @Inject(forwardRef(() => MessageService))
    // private readonly messageService: MessageService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
      const user = new User();
      user.userName = createUserDto.userName;
      user.id = createUserDto.id;
      // user.currentMatch = null;
      // user.matchHistory = null;
      user.nbLosses = 0;
      user.nbVictories = 0;
      user.ladderLevel = 0;
      // user.achievements = null;
      // user.friends = null;
      // user.befriended = null;
      // user.blockedUsers = null;
      // user.blockingUsers = null;
      // user.channelsUserIsOwner = null;
      // user.channelsUserIsAdmin = null;
      // user.channelsUserIsIn = null;
      // user.channelsUserIsBanned = null;
      // user.channelsUserIsMuted = null;
      // user.messagesHistory = null;
      return this.usersRepository.save(user);
  }

  async findOrCreate(id: number, userName: string) : Promise<User> {
    return await this.findOne(id) || await this.create({"userName": userName, "id": id});
  }

  async DeleteOldAvatarFile (id: number) {
    const myAvatar = await this.usersRepository.findOne(id).then((user) => { return user.avatar;});
    if (myAvatar)
    {
      fs.unlink("avatars/" + myAvatar, (err) => {
        if (err) 
          throw err;
      });
    }
  }

  public async setAvatar(id: number, avatarUrl: string): Promise<void>  {
    this.DeleteOldAvatarFile(id);
    await this.usersRepository.update(id, {avatar: avatarUrl});
 }

  async getAvatar(userName: string) : Promise<String>  {
    return this.usersRepository.findOne(userName).then((user) => { return user.avatar; });
  }

  async updateUserName(id: number, updateUserNameDto: UpdateUserNameDto): Promise<User> {
    await this.usersRepository.update(id, {userName: updateUserNameDto.newUserName});
    return this.usersRepository.findOne(id);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = this.usersRepository.findOne(id);
    return user;
  }

  async remove(id: number): Promise<void> {
    this.DeleteOldAvatarFile(id);
    await this.usersRepository.delete(id);
  }

  async userAlreadyExists(createUserDTO: CreateUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({ userName: createUserDTO.userName });
    if (user)
      return true;
    return false;
  }
  async userNameAlreadyExists(name: string): Promise<any> {
    const user = await this.usersRepository.findOne({ userName: name });
    if (user)
      return true;
    return false;
  }

  async removeAvatar(id: number): Promise<void> {
    this.DeleteOldAvatarFile(id);
    await this.usersRepository.update(id, {avatar: null});
  }

  // async getAllMessages(id: number) : Promise<Message[]> {
    
  // }

  async addMessageToHistory(userId: number, messageId: number) : Promise<void> {
		const user = await this.usersRepository.findOne(userId);
		user.messagesHistory.unshift(messageId);
		this.usersRepository.save(user);
  }
  
  async addVictory(winnerId: number) : Promise<void> {
    // await this.usersRepository.increment(id, "nbVictories", 1);
    const winner = await this.usersRepository.findOne(winnerId);
    winner.nbVictories += 1;
    this.usersRepository.save(winner);
  }

  async addDefeat(loserId: number) : Promise<void> {
    // await this.usersRepository.increment(id, "nbLosses", 1);
    const loser = await this.usersRepository.findOne(loserId);
    loser.nbLosses += 1;
    this.usersRepository.save(loser);
  }
}
