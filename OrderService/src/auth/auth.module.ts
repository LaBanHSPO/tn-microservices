import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './auth.service';
import { UserModule } from '../services/user/user.module';
import { AuthController } from './auth.controller';
import { GqlAuthGuard } from './guards/graphql.guard';


@Module({
  imports: [
    GqlAuthGuard,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('moduleConfig.jwtSecret'),
          signOptions: { expiresIn: config.get('moduleConfig.expiresIn'), },
        }
      },
    }),
  ],

  controllers: [
    AuthController
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
  exports: [
    AuthService,
  ]
})
export class AuthModule {}
