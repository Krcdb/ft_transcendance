import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> | Promise<void> {
      const user = new User();
      user.userName = createUserDto.userName;
      return this.usersRepository.save(user).catch((e) => {
        if (this.usersRepository.findOne(user.userName)) {
          throw new BadRequestException(
            'This User Name already exist, please try with another one.',
          );
        }
        return e;
      });
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
    return this.usersRepository.findOne(userName);
  }

  async findOneAgain(userName: string): Promise<User> {
    return this.usersRepository.findOne(userName);
  }

  async remove(userName: string): Promise<void> {
    this.DeleteOldAvatarFile(userName);
    await this.usersRepository.delete(userName);
  }

  async removeAvatar(userName: string): Promise<void> {
    this.DeleteOldAvatarFile(userName);
    await this.usersRepository.update(userName, {avatar: null});
  }
}