import { Controller, Post, Body, Res } from "@nestjs/common";
import { SocialService } from "./social.service";
import { CreateSocialDto } from "./dto/create-social.dto";


@Controller("social")
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Post()
  create(@Body() createSocialDto: CreateSocialDto) {
      return this.socialService.create(createSocialDto);
  }

  @Post("/update")
  update(@Body() updateSocialDto,@Res() res){
      console.log("---------------update social--------------");
      res.jsonp({success: true});
  }
}
