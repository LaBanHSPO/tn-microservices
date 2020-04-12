import { Controller, Post, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import ServicesNames from '../constants/services.names';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @Get(ServicesNames.USER_PROFILE)
  getProfile(@Request() req) {
    const userInfo = this.authService.userService.findOne(req.user.id);
    return userInfo;
  }

  @UseGuards(LocalAuthGuard)
  @Post(ServicesNames.AUTH_LOGIN)
  async login(@Request() req) {
    return this.authService.signToken(req.user);
  }

}
