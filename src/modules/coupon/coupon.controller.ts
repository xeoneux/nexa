import { Controller, Post, Body, Res } from "@nestjs/common";
import { CouponService } from "./coupon.service";
import { CreateCouponDto } from "./dto/create-coupon.dto";


@Controller("coupon")
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
      return this.couponService.create(createCouponDto);
  }

  @Post("/update")
  update(@Body() updateCouponDto,@Res() res){
      console.log("---------------update Coupon--------------");
      res.jsonp({success: true});
  }
}
