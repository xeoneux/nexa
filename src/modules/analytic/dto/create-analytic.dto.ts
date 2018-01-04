import { IsString } from "class-validator";

export class CreateAnalyticDto {
  @IsString() 
  name: string;
}
