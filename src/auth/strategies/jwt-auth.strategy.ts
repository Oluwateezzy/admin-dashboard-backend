import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StrategyEnum } from './strategy.enums';
import { IJwtPayload } from './jwt/types/jwt-payload.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(
  Strategy,
  StrategyEnum.JWT,
) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secrets.default'),
      usernameField: 'emailAddress',
    });
  }

  async validate(payload: IJwtPayload) {
    const user: any = await this.userService.findByCondition({
      email: payload.email,
    });

    return user;
  }
}
