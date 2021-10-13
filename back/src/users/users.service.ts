import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> | Promise<void> {
      // if (this.usersRepository.findOne(createUserDto.userName))
      //   return ;
      // await this.validateUserName(createUserDto.userName);
      // if (this.validateUserName(createUserDto.userName) == false)
      //   throw new HttpException('User Name is already taken', HttpStatus.CONFLICT);
      const user = new User();
      user.userName = createUserDto.userName;
      return this.usersRepository.save(user);//.catch((e) => {
      //   if (this.usersRepository.findOne(user.userName)) {
      //     throw new BadRequestException(
      //       'This User Name already exist, please try with another one.',
      //     );
      //   }
      //   return e;
      // });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(userName: string): Promise<User> {
    const user = this.usersRepository.findOne(userName);
    // if (!user)
    // {
    //   console.log('nope');
    //   throw new HttpException('User doesn\'t exist', HttpStatus.NOT_FOUND);
    // }
    return user;
    // return this.usersRepository.findOne(userName);
  }

  async remove(userName: string): Promise<void> {
    await this.usersRepository.delete(userName);
  }

  async userAlreadyExists(createUserDTO: CreateUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({ userName: createUserDTO.userName });
    if (user)
      return true;
    return false;
}
}

