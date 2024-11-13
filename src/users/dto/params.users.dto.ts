import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserParamsDTO {
  @ApiProperty({ description: 'User ID' })
  @IsNotEmpty()
  @IsString()
  id: string;
}
