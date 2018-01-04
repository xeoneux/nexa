import {Component, Inject} from '@nestjs/common';
import {Request} from 'express';
import {use} from 'passport';
import {ExtractJwt, Strategy, VerifiedCallback} from 'passport-jwt';

import {AuthService} from './auth.service';
import {AuthPayloadDto} from './dto/auth-payload.dto';

@Component()
export class AuthStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
        {
          secretOrKey: 'secret',
          passReqToCallback: true,
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async (
            req: Request, payload: AuthPayloadDto, done: VerifiedCallback) => {
          const isValid = await this.authService.validateUser(payload);
          if (!isValid) {
            return done('Unauthorized', false);
          }
          done(null, payload);
        });
    use(this);
  }
}
