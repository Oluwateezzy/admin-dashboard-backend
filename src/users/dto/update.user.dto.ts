import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UserDTO } from './users.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserDTO extends PartialType(UserDTO) {}

export class UpdateUserRoleDTO {
  @ApiProperty({ description: 'Role of the user', enum: Role })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
