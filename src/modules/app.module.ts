import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "../../config";
import { AuthModule } from "./auth/auth.module";
import { User } from "./user/user.entity";
import { Offer } from "./offer/offer.entity";
import { Recharge } from "./recharge/recharge.entity";
import { Analytic } from "./analytic/analytic.entity";
import { Social } from "./social/social.entity";
import { Coupon } from "./coupon/coupon.entity";
import { UserModule } from "./user/user.module";
import { OfferModule } from "./offer/offer.module";
import { RechargeModule } from "./recharge/recharge.module";
import { AnalyticModule } from "./analytic/analytic.module";
import { CouponModule } from "./coupon/coupon.module";
import { SocialModule } from "./social/social.module";

@Module({
  modules: [
    TypeOrmModule.forRoot([User, Offer, Recharge, Analytic, Coupon, Social], {
      port: 5432,
      type: "postgres",
      host: "localhost",
      username: "user",
      password: "pass",
      database: "test",
      entities: ["src/**/**.entity{.ts,.js}"],
      synchronize: true,
      logging: config.NODE_ENV !== "production"

    }),
    AuthModule,
    UserModule,
    OfferModule,
    RechargeModule,
    AnalyticModule,
    CouponModule,
    SocialModule
  ]
})
export class ApplicationModule {
  constructor() {
    console.log("Loaded Application Module");
  }
}
