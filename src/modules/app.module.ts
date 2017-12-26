import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {AuthModule} from './auth/auth.module';
import {ConfigModule} from './config/config.module';
import {User} from './user/user.entity';
import {UserModule} from './user/user.module';

@Module({
  modules:
      [ConfigModule, TypeOrmModule.forRoot([User]), AuthModule, UserModule],
})
export class ApplicationModule {}
