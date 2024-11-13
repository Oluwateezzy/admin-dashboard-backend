import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true, example: 'admin@admin.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: '12345678' })
  password: string;
}
