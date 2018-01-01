import {plainToClass} from 'class-transformer';
import {IsIn, IsInt, validate, validateSync} from 'class-validator';
import {load} from 'dotenv-extended';

load({errorOnExtra: true, errorOnMissing: true});

export class Config {
  // Env
  PORT: number;
  @IsIn(['development', 'production'])
  NODE_ENV: string;

  // Auth
  EXPIRY: string;
  SECRET: string;

  // Database
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
}

const config = plainToClass(Config, process.env);
const errors = validateSync(config);

if (errors.length > 0) {
  console.error(errors);
  process.exit();
}

export {config};
