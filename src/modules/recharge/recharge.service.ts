import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Recharge } from "./recharge.entity";
import { Repository } from "typeorm/repository/Repository";
import { CreateRechargeDto } from "./dto/create-recharge.dto";

@Component()
export class RechargeService{
    constructor(@InjectRepository(Recharge) private readonly offerRepository: Repository<Recharge>){};

    async create(createRechargeDto: CreateRechargeDto ){
        console.log("-------------create recharge------");
    }

}