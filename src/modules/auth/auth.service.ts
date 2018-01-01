import {Component, Inject, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {classToPlain} from 'class-transformer';
import {sign} from 'jsonwebtoken';
import {Repository} from 'typeorm';

import {User} from '../user/user.entity';

import {CreateTokenDto} from './dto/create-token.dto';
import { config } from '../../../config';

@Component()
export class AuthService {
  constructor(
      @InjectRepository(User) private readonly userRepository:
          Repository<User>) {}

  async createToken(createTokenDto: CreateTokenDto) {
    const user = await this.userRepository.findOne({
      where: {email: createTokenDto.email, password: createTokenDto.password}
    });
    if (!!user) {
      const payload = classToPlain(createTokenDto);
      const expiry = config.EXPIRY;
      const secret = config.SECRET;
      return {
        expires_in: expiry,
        access_token: sign(payload, secret, {expiresIn: expiry})
      };
    } else {
      throw new NotFoundException();
    }
  }

  async validateUser(signedUser): Promise<boolean> {
    console.log(signedUser);
    // put some validation logic here
    // for example query user by id / email / username
    return true;
  }
}
