import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Hasher } from 'src/libs/hasher';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenerateToken } from './utils/getTokens';
import { Encryptor } from 'src/libs/encryptor';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    Hasher,
    PrismaService,
    GenerateToken,
    Encryptor,
    Hasher,
  ],
})
export class AuthModule {}
