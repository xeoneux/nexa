import {Component, Inject, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {classToPlain} from 'class-transformer';
import {sign} from 'jsonwebtoken';
import {Repository} from 'typeorm';

import {config} from '../../../config';
import {User} from '../user/user.entity';

import {AuthPayloadDto} from './dto/auth-payload.dto';
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

  async validateUser(signedUser: AuthPayloadDto): Promise<boolean> {
    const user =
        await this.userRepository.findOne({where: {email: signedUser.email}});
    if (user) {
      if (user.password === signedUser.password) return true;
      return false;
    }
    return false;
  }
}
