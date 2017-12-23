import {IsEmail, IsNotEmpty, IsString, MaxLength} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty() @MaxLength(20)
  password: string;
}
