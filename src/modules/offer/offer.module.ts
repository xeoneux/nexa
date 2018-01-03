import { Module } from "@nestjs/common";
import { OfferService } from "./offer.service";
import { OfferController } from "./offer.controller";

@Module({
  components: [OfferService],
  controllers: [OfferController]
})
export class OfferModule {}
