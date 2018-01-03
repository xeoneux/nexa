import {sanitize, ToInt} from 'class-sanitizer';
import {plainToClass} from 'class-transformer';
import {IsIn, IsInt, validate, validateSync} from 'class-validator';
import {load} from 'dotenv-extended';

load({errorOnExtra: true, errorOnMissing: true});

export class Config {
  // Env
  @ToInt()
  PORT: number;
  @IsIn(['development', 'production'])
  NODE_ENV: string;

  // Auth
  EXPIRY: string;
  SECRET: string;

  // Database
  @ToInt()
  DB_PORT: number;
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
}

const config = plainToClass(Config, process.env);
sanitize(config);
const errors = validateSync(config);

if (errors.length) {
  console.error(errors);
  process.exit();
}

export {config};
