
import { Body, Controller, Delete, Get, Res, Param, Post, UploadedFile, UseInterceptors, StreamableFile, Header } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { join, extname } from  'path';
import { createReadStream } from 'fs';

@Controller('users')
export class UsersController {
  SERVER_URL:  string  =  "http://localhost:3000/";
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> | Promise<void> {
    return this.usersService.create(createUserDto);
  }

  @Post('avatar/:userName')
  @UseInterceptors(FileInterceptor('avatar',
      {
        storage: diskStorage({
          destination: './avatars', 
          filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
        })
      }
    )
    )
    uploadAvatar(@Param('userName') userName, @UploadedFile() file) {
      this.usersService.setAvatar(String(userName), `${file.filename}`);
      // this.usersService.setAvatar(String(userName), `${this.SERVER_URL}${file.path}`);
    }

    @Get(':userName/avatar')
    serveAvatar(@Param('userName') userName, @Res() res) : Promise<any> {
      const myWrapperFunction = async () => {
        const myResolvedPromiseString = await this.usersService.getAvatar(userName);
        return res.sendFile(myResolvedPromiseString, { root: 'avatars'});
      }
      return myWrapperFunction();
    }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':userName')
  findOne(@Param('userName') userName: string): Promise<User> {
    this.usersService.findOne(userName).then((value) => {
      console.log(value.avatar);
      // expected output: "Success!"
    });
    return this.usersService.findOne(userName);
  }

  // @Get(':userName/avatar')
  // getFile(@Param('userName') userName: string): StreamableFile {
  //   const file = createReadStream(this.usersService.getAvatar(userName));
  //   return new StreamableFile(file);
  // }
  // @Header('Content-Type', 'image/png')
  // seeUploadedFile(@Param('imgpath') image, @Res() res) {
  //   return res.sendFile(image, { root: './files' });
  // }

  @Delete(':userName')
  remove(@Param('userName') userName: string): Promise<void> {
    return this.usersService.remove(userName);
  }
}