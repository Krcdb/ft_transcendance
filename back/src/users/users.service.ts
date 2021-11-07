import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserNameDto } from './dto/update-userName.dto';
import { User } from './user.entity';
import * as fs from 'fs';
// import { ChannelDataService } from '../chat/channel/channel.service';
// import { MessageService } from '../chat/message/message.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
      const user = new User();
      user.userName = createUserDto.userName;
      user.id = createUserDto.id;
      // user.currentMatch = null;
      user.matchHistory = [];
      user.nbLosses = 0;
      user.nbVictories = 0;
      user.ladderLevel = 0;
      user.achievements = [];
      user.friends = [];
      user.blockedUsers = [];
      user.blockingUsers = [];
      user.channelsUserIsOwner = [];
      user.channelsUserIsAdmin = [];
      user.channelsUserIsIn = [];
      user.channelsUserIsBanned = [];
      user.channelsUserIsMuted = [];
      user.messagesHistory = [];
      return this.usersRepository.save(user);
  }

  /////////////////////////////////////////
  // Recherche et gestion d'utilisateurs //
  /////////////////////////////////////////

  async findOrCreate(id: number, userName: string) : Promise<User> {
    return await this.findOne(id) || await this.create({"userName": userName, "id": id});
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
  
  ///////////////////////
  // Gestion du profil //
  ///////////////////////

  public async setAvatar(id: number, avatarUrl: string): Promise<void>  {
    this.DeleteOldAvatarFile(id);
    await this.usersRepository.update(id, {avatar: avatarUrl});
  }

  async getAvatar(id: number) : Promise<String>  {
    return this.usersRepository.findOne(id).then((user) => { return user.avatar; });
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

  async removeAvatar(id: number): Promise<void> {
    this.DeleteOldAvatarFile(id);
    await this.usersRepository.update(id, {avatar: null});
  }

  async updateUserName(id: number, updateUserNameDto: UpdateUserNameDto): Promise<User> {
    await this.usersRepository.update(id, {userName: updateUserNameDto.newUserName});
    return this.usersRepository.findOne(id);
  }

  async updateLogState(id: number, isLog: boolean): Promise<User> {
    await this.usersRepository.update(id, {isActive: isLog});
    return this.usersRepository.findOne(id);
  }

  ///////////////////////////
  // Historique des matchs //
  ///////////////////////////
  
  async addMatchToHistory(userId: number, matchId: number) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    user.matchHistory.push(matchId);
    this.usersRepository.save(user);
  }

  async addVictory(winnerId: number) : Promise<void> {
    const winner = await this.usersRepository.findOne(winnerId);
    winner.nbVictories += 1;
    this.usersRepository.save(winner);
  }
  
  async addDefeat(loserId: number) : Promise<void> {
    const loser = await this.usersRepository.findOne(loserId);
    loser.nbLosses += 1;
    this.usersRepository.save(loser);
  }
  
  //////////////////////////////////
  // Relations entre Utilisateurs //
  //////////////////////////////////
  
  // Ajout de l'utilisateur
  async addAsFriend(userId: number, friendId: number) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    const friend = await this.usersRepository.findOne(friendId);
    user.friends.push(friendId);
    friend.friends.push(userId);
    this.usersRepository.save(user);
    this.usersRepository.save(friend);
  }
  async addAsBlocked(userId: number, blockedId: number) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    const blocked = await this.usersRepository.findOne(blockedId);
    user.blockedUsers.push(blockedId);
    blocked.blockingUsers.push(userId);
    this.usersRepository.save(user);
    this.usersRepository.save(blocked);
  }
  
  // Retrait de l'utilisateur
  async removeFromFriends(userId: number, friendId: number) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    const friend = await this.usersRepository.findOne(friendId);
    user.friends.splice(user.friends.indexOf(friendId), 1);
    friend.friends.splice(friend.friends.indexOf(userId), 1);
    this.usersRepository.save(user);
    this.usersRepository.save(friend);
  }
  async removeFromBlocked(userId: number, blockedId: number) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    const blocked = await this.usersRepository.findOne(blockedId);
    user.blockedUsers.splice(user.blockedUsers.indexOf(blockedId), 1);
    blocked.blockingUsers.splice(blocked.blockingUsers.indexOf(userId), 1);
    this.usersRepository.save(user);
    this.usersRepository.save(blocked);
  }
  
  //////////////////////////
  // Gestion des Channels //
  //////////////////////////
  
  // Ajout de l'utilisateur
  async addToChannelUsers(userId: number, channelName: string) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
		user.channelsUserIsIn.push(channelName);
		this.usersRepository.save(user);
  }
  async addToChannelOwner(userId: number, channelName: string) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
		user.channelsUserIsOwner.push(channelName);
		this.usersRepository.save(user);
  }
  async addToChannelAdmins(userId: number, channelName: string) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
		user.channelsUserIsAdmin.push(channelName);
		this.usersRepository.save(user);
  }
  async addToChannelBanned(userId: number, channelName: string) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
		user.channelsUserIsBanned.push(channelName);
		this.usersRepository.save(user);
  }
  async addToChannelMuted(userId: number, channelName: string) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
		user.channelsUserIsMuted.push(channelName);
		this.usersRepository.save(user);
  }
  
  // Retrait de l'utilisateur
  async removeFromChannelUsers(userId: number, channelName: string) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    user.channelsUserIsIn.splice(user.channelsUserIsIn.indexOf(channelName), 1);
    this.usersRepository.save(user);
  }
  async removeFromChannelOwner(userId: number, channelName: string) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    user.channelsUserIsOwner.splice(user.channelsUserIsOwner.indexOf(channelName), 1);
    this.usersRepository.save(user);
  }
  async removeFromChannelAdmins(userId: number, channelName: string) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    user.channelsUserIsAdmin.splice(user.channelsUserIsAdmin.indexOf(channelName), 1);
    this.usersRepository.save(user);
  }
  async removeFromChannelBanned(userId: number, channelName: string) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    user.channelsUserIsBanned.splice(user.channelsUserIsBanned.indexOf(channelName), 1);
    this.usersRepository.save(user);
  }
  async removeFromChannelMuted(userId: number, channelName: string) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    user.channelsUserIsMuted.splice(user.channelsUserIsMuted.indexOf(channelName), 1);
    this.usersRepository.save(user);
  }
  
  ///////////////////////////
  // Gestions des messages //
  ///////////////////////////
  
  async addMessageToHistory(userId: number, messageId: number) : Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    user.messagesHistory.push(messageId);
    this.usersRepository.save(user);
  }
  
  //////////////////////////////////
  // Authentifiction a 2 facteurs //
  //////////////////////////////////
  
  async settwoFAuthSecret(secret: string, id: number) {
    return this.usersRepository.update(id, {
      twoFAuthSecret: secret
    });
  }

  async turnOnTwoFAuth(id: number) {
    return this.usersRepository.update(id, {
      isTwoFAuthEnabled: true
    });
  }

  async turnOffTwoFAuth(id: number) {
    return this.usersRepository.update(id, {
      isTwoFAuthEnabled: false
    });
  }
}
