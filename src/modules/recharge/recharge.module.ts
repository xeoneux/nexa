import { Module } from "@nestjs/common";
import { RechargeService } from "./recharge.service";
import { RechargeController } from "./recharge.controller";

@Module({
  components: [RechargeService],
  controllers: [RechargeController]
})
export class RechargeModule {}
