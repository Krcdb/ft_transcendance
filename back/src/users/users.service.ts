import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserNameDto } from './dto/update-userName.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { User } from './user.entity';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
	private readonly usersRepository: Repository<User>,
	private readonly jwtService: JwtService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {

      const user = new User();
      user.userName = createUserDto.userName;
      user.id = createUserDto.id;
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

  async getUserFromToken(token: string) {
	try {
		const payload = this.jwtService.verify(token, {
		  secret: jwtConstants.secret,
		});
		if (payload.userId) {
		  return await this.usersRepository.findOne(payload.userId);
		}
	  } catch (err) {
		return null;
	  }
  }
}
