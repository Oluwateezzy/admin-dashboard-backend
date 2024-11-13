import { PartialType } from '@nestjs/swagger';
import { UserDTO } from './users.dto';

export class UpdateUserDTO extends PartialType(UserDTO) {}
