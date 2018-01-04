import { Controller, Post, Body, Res } from "@nestjs/common";
import { OfferService } from "./offer.service";
import { CreateOfferDto } from "./dto/create-offer.dto";


@Controller("Offer")
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
      return this.offerService.create(createOfferDto);
  }

  @Post("/update")
  update(@Body() updateOfferDto,@Res() res){
      console.log("---------------update Offer--------------");
      res.jsonp({success: true});
  }
}
