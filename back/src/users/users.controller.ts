import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

// export class UserNameTaken extends HttpException {
//   constructor() { super('User Name is already taken', HttpStatus.CONFLICT) }
// }

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> | Promise<void> {
    // console.log('hey');
    // const allUsers = this.usersService.findAll();
    // for (let i in allUsers)
    // {
    //   console.log(allUsers[i].userName + ' // ' + createUserDto.userName);
    //   if (allUsers[i].userName === createUserDto.userName)
    //   {
    //     console.log(createUserDto.userName + ': User name taken');
    //     throw new UserNameTaken();
    //   }
    // }
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':userName')
  findOne(@Param('userName') userName: string): Promise<User> {
    const user = this.usersService.findOne(userName);
    // if (!user)
    // {
    //   console.log('nope');
    //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // }
    return user;
  }

  @Delete(':userName')
  remove(@Param('userName') userName: string): Promise<void> {
    return this.usersService.remove(userName);
  }
}