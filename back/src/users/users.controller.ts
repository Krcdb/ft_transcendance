import { Body, Controller, Delete, Get, Res, Param, Post, UploadedFile, UseInterceptors, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { extname } from  'path';
import { HttpStatus } from '@nestjs/common';
import { Public } from 'src/auth/utils/public.decorator';
import { UpdateUserNameDto } from './dto/update-userName.dto';
import { IdDto } from './dto/id.dto';
import { AchievementsInterface } from 'src/achievements/achievements';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ------ // 
  //  POST  //
  // ------ // 
  
  // -> create a new user
  @Post()
  @Public()
  async addUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    if (await this.usersService.userExists(createUserDto.id)){
        return res.status(HttpStatus.CONFLICT).json({
            message: "User already exists"
        })
    }
    if (await this.usersService.userNameAlreadyExists(createUserDto.userName)){
      return res.status(HttpStatus.CONFLICT).json({
          message: "User Name is already taken"
      })
  }
    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({
        message: "User has been created successfully",
        user
    })
}

  // -> update user name
  @Post(':id')
  async updateUserName(@Res() res, @Param('id') id: number, @Body() updateUserNameDto: UpdateUserNameDto): Promise<User> {
    if (await this.usersService.userNameAlreadyExists(updateUserNameDto.newUserName)) {
      return res.status(HttpStatus.CONFLICT).json({
        message: "User Name is already taken"
      })
    }
    const user = await this.usersService.updateUserName(id, updateUserNameDto);
    return res.status(HttpStatus.OK).json({
      message: "User Name has been successfully updated",
      user
    })
  }

  // -> add / replace avatar picture
  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('avatar',
  {
    storage: diskStorage({
      destination: './avatars',
      filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
      return cb(null, `${randomName}${extname(file.originalname)}`)
    }
    })
  }))
  async uploadAvatar(@Res() res, @Param('id') id: number, @UploadedFile() file): Promise<User>  {
    const user = await this.usersService.setAvatar(id, `${file.filename}`);
    return res.status(HttpStatus.OK).json({
      message: "Avatar has been successfully uploaded",
      user
    })
  }

  // -> add user as friend
  @Post(':id/friends')
  async addFriend(@Res() res, @Param('id') id: number, @Body() idDto: IdDto) {
    const message = await this.usersService.addAsFriend(id, idDto.id);
    return res.status(HttpStatus.OK).json({
      message: message
    })
  }

  @Post(':id/block')
  async addBlock(@Res() res, @Param('id') id: number, @Body() idDto: IdDto) {
    const message = await this.usersService.addAsBlocked(id, idDto.id);
    return res.status(HttpStatus.OK).json({
      message: message
    })
  }

  // -> remove user from friends
  @Post(':id/remove-friend')
  async removeFriend(@Res() res, @Param('id') id: number, @Body() idDto: IdDto) {
    const message = await this.usersService.removeFromFriends(id, idDto.id);
    return res.status(HttpStatus.OK).json({
      message: message
    })
  }

  @Post(':id/unblock')
  async removeBlocked(@Res() res, @Param('id') id: number, @Body() idDto: IdDto) {
    const message = await this.usersService.removeFromBlocked(id, idDto.id);
    return res.status(HttpStatus.OK).json({
      message: message
    })
  }


  // ------ // 
  //   GET  //
  // ------ // 

  // -> get all users
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // -> get one user
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  // -> get all achievements 
  @Get(':id/achievements')
  getAchievements(@Param('id') id: number): Promise<AchievementsInterface[]> {
    return this.usersService.getAchievements(id);
  }

  // -> get one user Friends
  @Get(':id/friends')
  getFriends(@Param('id') id: number): Promise<User[]> {
    return this.usersService.getFriends(id);
  }

  // -> get one user Blocked Users
  @Get(':id/blocked')
  getBlocked(@Param('id') id: number): Promise<User[]> {
    return this.usersService.getBlocked(id);
  }

  // -> get all users except blocked ones
  @Get(':id/non-block-users')
  getUsersexceptBlocked(@Param('id') id: number): Promise<User[]> {
    return this.usersService.getUsersexceptBlocked(id);
  }
  // -> logout 
  @Get('logout/:id')
  logout(@Param('id') id: number): Promise<User> {
    return this.usersService.updateLogState(id, false);
  }

  // -> get avatar picture (should be the only public request)
  @Public()
  @Get(':id/avatar')
  serveAvatar(@Param('id') id: number, @Res() res) : Promise<any> {
    const getAvatarFile = async () => {
      const avatarPath = await this.usersService.getAvatar(id);
      if (avatarPath)
        return res.sendFile(avatarPath, { root: 'avatars'});
      else
        throw new  NotFoundException;
    }
    return getAvatarFile();
  }

  // -------- // 
  //  DELETE  //
  // -------- // 

  // -> delete the user
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  // -> delete the user avatar picture
  @Delete(':id/avatar')
  removeAvatar(@Param('id') id: number): Promise<void> {
    return this.usersService.removeAvatar(id);
  }
}
