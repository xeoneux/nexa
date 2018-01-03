import { Module } from "@nestjs/common";
import { AnalyticService } from "./analytic.service";
import { AnalyticController } from "./analytic.controller";

@Module({
  components: [AnalyticService],
  controllers: [AnalyticController]
})
export class AnalyticModule {}
