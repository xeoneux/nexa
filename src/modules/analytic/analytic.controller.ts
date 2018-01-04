import { Controller, Post, Body, Res } from "@nestjs/common";
import { AnalyticService } from "./analytic.service";
import { CreateAnalyticDto } from "./dto/create-analytic.dto";


@Controller("analytic")
export class AnalyticController {
  constructor(private readonly analyticService: AnalyticService) {}

  @Post()
  create(@Body() createAnalyticDto: CreateAnalyticDto) {
      return this.analyticService.create(createAnalyticDto);
  }

  @Post("/update")
  update(@Body() updateAnalyticDto,@Res() res){
      console.log("---------------update Analytic--------------");
      res.jsonp({success: true});
  }
}
