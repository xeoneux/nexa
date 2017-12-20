import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {User} from './user/user.entity';
import {UserModule} from './user/user.module';

@Module({
  modules: [
    TypeOrmModule.forRoot([User]),
    UserModule,
  ],
})
export class ApplicationModule {}
