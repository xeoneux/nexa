import { IsString } from "class-validator";

export class CreateCouponDto {
  @IsString() 
  name: string;
}
