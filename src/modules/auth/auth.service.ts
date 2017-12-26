import {Component, Inject, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {classToPlain} from 'class-transformer';
import {sign} from 'jsonwebtoken';
import {Repository} from 'typeorm';

import {User} from '../user/user.entity';

import {authConfig} from './auth.config';
import {CreateTokenDto} from './dto/create-token.dto';

@Component()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository:
                  Repository<User>) {}

  async createToken(createTokenDto: CreateTokenDto) {
    const user = await this.userRepository.findOne({
      where: {email: createTokenDto.email, password: createTokenDto.password}
    });
    if (!!user) {
      const payload = classToPlain(user);
      return {
        expires_in: authConfig.expiresIn,
        access_token: sign(
            payload, authConfig.secret, {expiresIn: authConfig.expiresIn})
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
