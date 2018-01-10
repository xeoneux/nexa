import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';

import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from './user.entity';
import {UserService} from './user.service';

@ApiUseTags('user') @Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  index() {
    return this.userService.find();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  show(@Param('id') id) {
    return this.userService.findOneById(id);
  }

  @Put(':id')
  update(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  destroy(@Param('id') id) {
    return this.userService.deleteById(id);
  }
}
