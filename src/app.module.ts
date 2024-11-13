import { CommonModule } from '../src/common/common.module';
import { JwtAuthStrategy } from 'src/auth/strategies/jwt-auth.strategy';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvFileName, validationSchema } from './common/config';
import configuration from './common/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFileName(),
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CommonModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthStrategy],
})
export class AppModule {}
