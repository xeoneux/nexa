import { Module } from "@nestjs/common";
import { CouponService } from "./coupon.service";
import { CouponController } from "./coupon.controller";

@Module({
  components: [CouponService],
  controllers: [CouponController]
})
export class CouponModule {}
