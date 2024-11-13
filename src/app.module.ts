import { JwtAuthStrategy } from 'src/auth/strategies/jwt-auth.strategy';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvFileName, validationSchema } from './common/config';
import configuration from './common/config/configuration';
import { CommonModule } from './common/common.module';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { Hasher } from './libs/hasher';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFileName(),
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    UsersModule,
    AuthModule,
    CommonModule,
    UsersModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthStrategy, UsersService, PrismaService, Hasher],
})
export class AppModule {}
