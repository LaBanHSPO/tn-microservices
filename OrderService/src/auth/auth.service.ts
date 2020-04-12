import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { UserService } from '../services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { makeAuthMutate } from './auth.query';
 
@Injectable()
export class AuthService {
  private readonly logVTPVN: string;
  constructor(
    public readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.logVTPVN = this.configService.get('appConfig.logVTPVN');
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ username });
    if (!user) return null;
    const valid = bcryptjs.compareSync(password, user.password);
    if (valid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signToken(user: any) {
    const payload = { username: user.username, sub: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signTokenLog(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
