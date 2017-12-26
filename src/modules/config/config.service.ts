import {Component} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {IsDefined, IsIn, IsNotEmpty, IsNumber, Max, validate} from 'class-validator';
import {config} from 'dotenv';

import {AuthConfig} from './configurations/auth.config';
import {DatabaseConfig} from './configurations/database.config';
import {EnvironmentConfig} from './configurations/environment.config';

@Component()
export class ConfigService {
  constructor() {
    config();
    this.authConfig = plainToClass(AuthConfig, process.env);
    this.databaseConfig = plainToClass(DatabaseConfig, process.env);
    this.environmentConfig = plainToClass(EnvironmentConfig, process.env);
    validate(this.authConfig);
    validate(this.databaseConfig);
    validate(this.environmentConfig);
  }

  authConfig: AuthConfig;
  databaseConfig: DatabaseConfig;
  environmentConfig: EnvironmentConfig;
}
