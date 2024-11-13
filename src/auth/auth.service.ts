import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { GenerateToken } from './utils/getTokens';
import { BaseResult, BaseResultWithData } from 'src/libs/results';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private userToken: GenerateToken,
  ) {}
  async login(data: LoginDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    // compare user Password
    const isMatched = await bcrypt.compare(data.password, user.password);

    if (!isMatched) throw new BadRequestException('Invalid login credentials');

    const [accessToken] = await this.userToken.getTokens(user);
    const { accessTokenEncrypt } = this.userToken.encryptTokens(accessToken);

    return new BaseResultWithData(
      HttpStatus.OK,
      'User Logged In',
      accessTokenEncrypt,
    );
  }
}
