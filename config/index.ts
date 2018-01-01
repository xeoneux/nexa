import {plainToClass} from 'class-transformer';
import {IsIn, IsInt, validate, validateSync} from 'class-validator';
import {load} from 'dotenv-extended';

load({errorOnExtra: true, errorOnMissing: true});

export class Config {
  // Env
  PORT;
  @IsIn(['development'])
  NODE_ENV;

  // Auth
  EXPIRY;
  SECRET;

  // Database
  DB_HOST;
  DB_USERNAME;
  DB_PASSWORD;
  DB_DATABASE;
}

const config = plainToClass(Config, process.env);
const errors = validateSync(config);

if (errors.length > 0) process.exit();

export {config};
