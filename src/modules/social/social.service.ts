import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Social } from "./social.entity";
import { Repository } from "typeorm/repository/Repository";
import { CreateSocialDto } from "./dto/create-social.dto";

@Component()
export class SocialService{
    constructor(@InjectRepository(Social) private readonly socialRepository: Repository<Social>){};

    async create(createSocialDto: CreateSocialDto ){
        console.log("-------------create Social------");
    }

}