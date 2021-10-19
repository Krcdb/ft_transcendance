import { Body, Controller, Delete, Get, Res, Param, Post, UploadedFile, UseInterceptors, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { extname } from  'path';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    if (await this.usersService.userAlreadyExists(createUserDto)){
        return res.status(HttpStatus.CONFLICT).json({
            message: "User already exists"
        })
    }
    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({
        message: "User has been created successfully",
        user
    })
}

  @Post(':userName/avatar')
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
  uploadAvatar(@Param('userName') userName, @UploadedFile() file) {
    this.usersService.setAvatar(String(userName), `${file.filename}`);
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

  @Get(':userName/avatar')
  serveAvatar(@Param('userName') userName, @Res() res) : Promise<any> {
    const getAvatarFile = async () => {
      const avatarPath = await this.usersService.getAvatar(userName);
      if (avatarPath)
        return res.sendFile(avatarPath, { root: 'avatars'});
      else
        throw new  NotFoundException;
    }
    return getAvatarFile();
  }

  @Delete(':userName')
  remove(@Param('userName') userName: string): Promise<void> {
    return this.usersService.remove(userName);
  }

  @Delete(':userName/avatar')
  removeAvatar(@Param('userName') userName: string): Promise<void> {
    return this.usersService.removeAvatar(userName);
  }
}
