import {MiddlewaresConsumer, Module, NestModule, RequestMethod,} from '@nestjs/common';
import {authenticate} from 'passport';

import {ConfigModule} from '../config/config.module';

import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {AuthStrategy} from './auth.strategy';

@Module({
  imports: [ConfigModule],
  components: [
    AuthService,
    AuthStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(authenticate('jwt', {session: false}))
        .forRoutes({path: '/auth/authorized', method: RequestMethod.ALL});
  }
}
