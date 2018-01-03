import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Coupon } from "./coupon.entity";
import { Repository } from "typeorm/repository/Repository";
import { CreateCouponDto } from "./dto/create-coupon.dto";

@Component()
export class CouponService{
    constructor(@InjectRepository(Coupon) private readonly couponRepository: Repository<Coupon>){};

    async create(createCouponDto: CreateCouponDto ){
        console.log("-------------create coupon------");
    }

}