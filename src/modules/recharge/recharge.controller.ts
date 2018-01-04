import { Controller, Post, Body, Res } from "@nestjs/common";
import { RechargeService } from "./recharge.service";
import { CreateRechargeDto } from "./dto/create-recharge.dto";


@Controller("recharge")
export class RechargeController {
  constructor(private readonly rechargeService: RechargeService) {}

  @Post()
  create(@Body() createRechargeDto: CreateRechargeDto) {
      return this.rechargeService.create(createRechargeDto);
  }

  @Post("/update")
  update(@Body() updateRechargeDto,@Res() res){
      console.log("---------------update Offer--------------");
      res.jsonp({success: true});
  }
}
