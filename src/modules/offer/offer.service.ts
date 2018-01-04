import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Offer } from "./offer.entity";
import { Repository } from "typeorm/repository/Repository";
import { CreateOfferDto } from "./dto/create-offer.dto";

@Component()
export class OfferService{
    constructor(@InjectRepository(Offer) private readonly offerRepository: Repository<Offer>){};

    async create(createOfferDto: CreateOfferDto ){
        console.log("-------------create offer------");
    }

}