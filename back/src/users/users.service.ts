import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { Match } from '../match/match.entity'
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
      const user = new User();
      user.userName = createUserDto.userName;
      user.intraId = createUserDto.intraId;
      return this.usersRepository.save(user);
  }

  async findOrCreate(intraId: number, userName: string) : Promise<User> {
    console.log("find or create user");
    console.log(intraId, " -> ", userName);
    return await this.findOneIntra(intraId) || await this.create({"userName": userName, "intraId": intraId});
  }

  async DeleteOldAvatarFile (userName: string) {
    const myAvatar = await this.usersRepository.findOne(userName).then((user) => { return user.avatar;});
    if (myAvatar)
    {
      fs.unlink("avatars/" + myAvatar, (err) => {
        if (err) throw err;
      });
    }
  }

  public async setAvatar(userName: string, avatarUrl: string): Promise<void>  {
    this.DeleteOldAvatarFile(userName);
    await this.usersRepository.update(userName, {avatar: avatarUrl});
 }

  async getAvatar(userName: string) : Promise<String>  {
    return this.usersRepository.findOne(userName).then((user) => { return user.avatar; });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(userName: string): Promise<User> {
    const user = this.usersRepository.findOne(userName);
    return user;
  }

  async findOneIntra(intra_id: number): Promise<User> {
    const user = this.usersRepository.findOne(intra_id);

    console.log("findOneIntra");
    if ( !user ) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async findOneAgain(userName: string): Promise<User> {
    return this.usersRepository.findOne(userName);
  }

  async remove(userName: string): Promise<void> {
    this.DeleteOldAvatarFile(userName);
    await this.usersRepository.delete(userName);
  }

  async userAlreadyExists(createUserDTO: CreateUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({ userName: createUserDTO.userName });
    if (user)
      return true;
    return false;
  }

  async removeAvatar(userName: string): Promise<void> {
    this.DeleteOldAvatarFile(userName);
    await this.usersRepository.update(userName, {avatar: null});
  }

  // fonction pas encore testée
  async updateUsersAfterGame(match: Match): Promise<void> {
    let winner = await this.usersRepository.findOne(match.players[0]);
    let loser = await this.usersRepository.findOne(match.players[1]);
    if (match.scores[0] < match.scores[1])
    {
      const tmp = loser;
      loser = winner;
      winner = tmp;
    }
    // probablement pas comme ca qu'on appelle increment
    await this.usersRepository.increment(winner.nbVictories);
    await this.usersRepository.increment(loser.nbLosses);
  }
}
