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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ------ // 
  //  POST  //
  // ------ // 

  @Post()
  @Public()
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
  uploadAvatar(@Param('id') id, @UploadedFile() file) {
    this.usersService.setAvatar(id, `${file.filename}`);
  }

  // ------ // 
  //   GET  //
  // ------ // 

  @Public()
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Public()
  @Get('logout/:id')
  logout(@Param('id') id: number): Promise<User> {
    return this.usersService.updateLogState(id, false);
  }

  @Public()
  @Get(':id/avatar')
  serveAvatar(@Param('id') id, @Res() res) : Promise<any> {
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

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Delete(':id/avatar')
  removeAvatar(@Param('id') id: number): Promise<void> {
    return this.usersService.removeAvatar(id);
  }
}
