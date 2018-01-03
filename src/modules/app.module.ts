import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {config} from '../../config';

import {AuthModule} from './auth/auth.module';
import {User} from './user/user.entity';
import {UserModule} from './user/user.module';

@Module({
  modules: [
    TypeOrmModule.forRoot([User], {
      type: 'postgres',
      synchronize: true,
      port: config.DB_PORT,
      host: config.DB_HOST,
      database: config.DB_DATABASE,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      entities: ['src/**/**.entity{.ts,.js}'],
      logging: config.NODE_ENV !== 'production',
    }),
    AuthModule, UserModule
  ]
})
export class ApplicationModule {}
