import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // create(@Body() createUserDto: CreateUserDto): Promise<User> | Promise<void> {
  //   return this.usersService.create(createUserDto);
  // }

  // @Post('/create-user')
  async addUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    if (await this.usersService.userAlreadyExists(createUserDto)){
        return res.status(HttpStatus.OK).json({
            message: "User already exists"
        })
    }
    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({
        message: "User has been created successfully",
        user
    })
}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':userName')
  findOne(@Param('userName') userName: string): Promise<User> {
    const user = this.usersService.findOne(userName);
    return user;
  }

  @Delete(':userName')
  remove(@Param('userName') userName: string): Promise<void> {
    return this.usersService.remove(userName);
  }
}