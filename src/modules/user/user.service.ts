import {BadRequestException, Component, Inject} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from './user.entity';

@Component()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository:
                  Repository<User>) {}

  async find() {
    return await this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.create(createUserDto);
    } catch (error) {
      throw new BadRequestException('Could Not Create Object');
    }
  }

  async update(id, updateUserDto: UpdateUserDto) {
    return await this.userRepository.updateById(id, updateUserDto);
  }

  async findOneById(id) {
    return await this.userRepository.findOneById(id);
  }

  async deleteById(id: string) {
    return await this.userRepository.deleteById(id);
  }
}
