import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import sharedModules from './common.modules.list';

@Global()
@Module(sharedModules)
@Module({
  providers: [CommonService],
  controllers: [CommonController]
})
export class CommonModule {}
