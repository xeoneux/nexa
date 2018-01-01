import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {config} from '../../config';

import {AuthModule} from './auth/auth.module';
import {User} from './user/user.entity';
import {UserModule} from './user/user.module';

@Module({
  modules: [
    TypeOrmModule.forRoot([User], {
      port: 5432,
      type: 'postgres',
      host: 'localhost',
      username: 'user',
      password: 'pass',
      database: 'test',
      entities: ['src/**/**.entity{.ts,.js}'],
      synchronize: true,
      logging: config.NODE_ENV !== 'production'
    }),
    AuthModule, UserModule
  ]
})
export class ApplicationModule {}
