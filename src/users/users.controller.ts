import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Public } from 'src/common/decorator/public.decorator';
import { UserDTO } from './dto/users.dto';
import { FilterQueryDTO, PaginationQueryDTO } from './dto/filter-paginate.dto';
import { UserParamsDTO } from './dto/params.users.dto';
import { UpdateUserDTO, UpdateUserRoleDTO } from './dto/update.user.dto';
import { CheckPolicies } from 'src/common/decorator/check-policies.decorator';
import { Role } from '@prisma/client';

@Controller('/api/users')
@ApiTags('Users')
@ApiBearerAuth('JWT')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @CheckPolicies({
    roles: [Role.ADMIN],
  })
  @Post('')
  @ApiOperation({ summary: 'Create User', description: 'Create User' })
  create(@Body() data: UserDTO) {
    return this.usersService.createUser(data);
  }

  @CheckPolicies({
    roles: [Role.ADMIN, Role.USER],
  })
  @Get('')
  @ApiOperation({ summary: 'Find Users', description: 'Find Users' })
  FindMany(
    @Query() filter: FilterQueryDTO,
    @Query() paginate: PaginationQueryDTO,
  ) {
    return this.usersService.findManyUser(filter, paginate);
  }

  @CheckPolicies({
    roles: [Role.ADMIN, Role.USER],
  })
  @Get('/:id')
  @ApiOperation({ summary: 'Find One User', description: 'Find One User' })
  FindOne(@Param() param: UserParamsDTO) {
    return this.usersService.findOneUser(param.id);
  }

  @CheckPolicies({
    roles: [Role.ADMIN],
  })
  @Patch('/:id')
  @ApiOperation({ summary: 'Update User', description: 'Update User' })
  update(@Param() param: UserParamsDTO, @Body() data: UpdateUserDTO) {
    return this.usersService.updateUser(param.id, data);
  }

  @CheckPolicies({
    roles: [Role.ADMIN],
  })
  @Patch('/role/:id')
  @ApiOperation({
    summary: 'Update User Role',
    description: 'Update User Role',
  })
  updateRole(@Param() param: UserParamsDTO, @Body() data: UpdateUserRoleDTO) {
    return this.usersService.updateUserRole(param.id, data.role);
  }

  @CheckPolicies({
    roles: [Role.ADMIN],
  })
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete User', description: 'Delete User' })
  delete(@Param() param: UserParamsDTO) {
    return this.usersService.deleteUser(param.id);
  }
}
