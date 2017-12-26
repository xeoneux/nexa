import {Expose} from 'class-transformer';
import {IsEmail, IsNotEmpty, MaxLength} from 'class-validator';

export class CreateTokenDto {
  @Expose() @IsEmail()
  email: string;
  @IsNotEmpty() @MaxLength(20)
  password: string;
}
