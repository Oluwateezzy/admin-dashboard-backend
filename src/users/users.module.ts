import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Hasher } from 'src/libs/hasher';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Hasher],
})
export class UsersModule {}
