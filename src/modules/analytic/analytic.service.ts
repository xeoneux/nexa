import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Analytic } from "./analytic.entity";
import { Repository } from "typeorm/repository/Repository";
import { CreateAnalyticDto } from "./dto/create-analytic.dto";

@Component()
export class AnalyticService {
  constructor(
    @InjectRepository(Analytic)
    private readonly analyticRepository: Repository<Analytic>
  ) {}

  async create(createAnalyticDto: CreateAnalyticDto) {
    console.log("-------------create Analytic------");
  }
}
