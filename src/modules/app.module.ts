import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {AuthModule} from './auth/auth.module';
import {User} from './user/user.entity';
import {UserModule} from './user/user.module';

@Module({
  modules: [TypeOrmModule.forRoot([User]), UserModule, AuthModule],
})
export class ApplicationModule {}
