import { IsString } from "class-validator";

export class CreateOfferDto {
  @IsString() 
  name: string;
}
