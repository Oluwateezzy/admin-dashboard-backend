import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Encryptor } from 'src/libs/encryptor';
import { IJwtPayload } from '../strategies/jwt/types';

@Injectable()
export class GenerateToken {
  constructor(
    private readonly encryptor: Encryptor,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  secret = this.configService.get<string>('jwt.secret');
  _getAccessToken(payload: IJwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.secret,
      expiresIn: this.configService.get<string>('jwt.expiresIn'),
    });
  }

  _getRefreshToken(payload: IJwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.secret,
      expiresIn: this.configService.get<string>('jwt.refreshTokenAge'),
    });
  }

  async getTokens(payload: IJwtPayload): Promise<[string]> {
    return await Promise.all([this._getAccessToken(payload)]);
  }

  encryptTokens(accessToken) {
    const encryptedAccessToken = this.encryptor.encrypt(accessToken);

    return {
      accessTokenEncrypt: encryptedAccessToken,
    };
  }
}
