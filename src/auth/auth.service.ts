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
import { UserDTO } from 'src/users/dto/users.dto';
import { Role, Status } from '@prisma/client';
import { Hasher } from 'src/libs/hasher';
import { userInfo } from 'os';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userToken: GenerateToken,
    private readonly usersService: UsersService,
    private readonly hasher: Hasher,
  ) {}
  async login(data: LoginDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const { password, ...userInfo } = user;

    // compare user Password
    const isMatched = await bcrypt.compare(data.password, password);

    if (!isMatched) throw new BadRequestException('Invalid login credentials');

    const [accessToken] = await this.userToken.getTokens(userInfo);
    const { accessTokenEncrypt } = this.userToken.encryptTokens(accessToken);

    return new BaseResultWithData(HttpStatus.OK, 'User Logged In', {
      userInfo,
      token: accessTokenEncrypt,
    });
  }

  async registerAdmin() {
    const AdminInfo: UserDTO = {
      email: 'admin@admin.com',
      username: 'admin',
      role: Role.ADMIN,
      status: Status.ACTIVE,
      password: '12345678',
    };
    await this.usersService._throwIfEmailIsInvalid(AdminInfo.email);
    await this.usersService._throwIfEmailOrUsernameExists({
      email: AdminInfo.email,
      username: AdminInfo.username,
    });
    AdminInfo.password = await this.hasher.hash(AdminInfo.password);
    const admin = await this.usersService.create(AdminInfo);
    return new BaseResultWithData(HttpStatus.CREATED, 'Admin Created', admin);
  }
}
