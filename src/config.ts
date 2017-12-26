import {plainToClass} from 'class-transformer';
import {IsDefined, IsIn, IsNotEmpty, IsNumber, Max, validate} from 'class-validator';
import {config as dotenv} from 'dotenv';

dotenv();

export class Config {
  PORT;

  @IsNotEmpty() SECRET;

  @IsIn(['development', 'staging', 'production'])
  NODE_ENV;

  async validate() {
    const errors = await validate(this);
    if (errors.length > 0) {
      console.error(errors);
      process.abort();
    }
  }
}

const config = plainToClass(Config, process.env);

config.validate();

export {config};
