import { IsString } from "class-validator";

export class CreateSocialDto {
  @IsString() 
  name: string;
}
