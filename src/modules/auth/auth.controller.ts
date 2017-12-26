import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';

import {AuthService} from './auth.service';
import {CreateTokenDto} from './dto/create-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token') @HttpCode(HttpStatus.OK)
  async getToken(@Body() createTokenDto: CreateTokenDto) {
    return await this.authService.createToken(createTokenDto);
  }

  @Get('authorized')
  async authorized() {
    console.log('Authorized route...');
  }
}
