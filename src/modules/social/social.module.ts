import { Module } from "@nestjs/common";
import { SocialService } from "./social.service";
import { SocialController } from "./social.controller";

@Module({
  components: [SocialService],
  controllers: [SocialController]
})
export class SocialModule {}
