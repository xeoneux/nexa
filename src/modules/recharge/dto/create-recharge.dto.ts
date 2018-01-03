import { IsString } from "class-validator";

export class CreateRechargeDto {
  @IsString() 
  name: string;
}
