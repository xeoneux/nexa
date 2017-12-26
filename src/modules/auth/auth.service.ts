import {Component, Inject, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {classToPlain} from 'class-transformer';
import {sign} from 'jsonwebtoken';
import {Repository} from 'typeorm';

import {config} from '../../config';
import {User} from '../user/user.entity';

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
      const expiresIn = 60 * 60;
      const payload = classToPlain(createTokenDto);
      return {
        expires_in: expiresIn,
        access_token: sign(payload, config.SECRET, {expiresIn})
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
