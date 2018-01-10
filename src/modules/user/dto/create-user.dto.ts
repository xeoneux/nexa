import {ApiModelProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, MaxLength} from 'class-validator';

export class CreateUserDto {
  @IsString() @ApiModelProperty()
  name: string;

  @ApiModelProperty() @IsEmail()
  email: string;

  @IsNotEmpty() @MaxLength(20) @ApiModelProperty()
  password: string;
}
