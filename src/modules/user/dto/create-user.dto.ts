import {IsEmail, IsNotEmpty, IsString, Max} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty() @Max(20)
  password: string;
}
