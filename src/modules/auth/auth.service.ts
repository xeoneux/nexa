import {Component, Inject, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {classToPlain} from 'class-transformer';
import {sign} from 'jsonwebtoken';
import {Repository} from 'typeorm';

import {ConfigService} from '../config/config.service';
import {AuthConfig} from '../config/configurations/auth.config';
import {User} from '../user/user.entity';

import {CreateTokenDto} from './dto/create-token.dto';

@Component()
export class AuthService {
  constructor(
      private readonly configService: ConfigService,
      @InjectRepository(User) private readonly userRepository:
          Repository<User>) {}

  authConfig: AuthConfig;

  async createToken(createTokenDto: CreateTokenDto) {
    const user = await this.userRepository.findOne({
      where: {email: createTokenDto.email, password: createTokenDto.password}
    });
    if (!!user) {
      const payload = classToPlain(createTokenDto);
      const expiry = this.configService.authConfig.EXPIRY;
      const secret = this.configService.authConfig.SECRET;
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
