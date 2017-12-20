import {Component, Inject} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {User} from './user.entity';

@Component()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository:
                  Repository<User>) {}

  async findAll() {
    return await this.userRepository.find();
  }
}
