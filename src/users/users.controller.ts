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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Public } from 'src/common/decorator/public.decorator';
import { UserDTO } from './dto/users.dto';
import { FilterQueryDTO, PaginationQueryDTO } from './dto/filter-paginate.dto';
import { UserParamsDTO } from './dto/params.users.dto';
import { UpdateUserDTO } from './dto/update.user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('')
  @ApiOperation({ summary: 'Create User', description: 'Create User' })
  create(@Body() data: UserDTO) {
    return this.usersService.createUser(data);
  }

  @Public()
  @Get('')
  @ApiOperation({ summary: 'Find Users', description: 'Find Users' })
  FindMany(
    @Query() filter: FilterQueryDTO,
    @Query() paginate: PaginationQueryDTO,
  ) {
    return this.usersService.findManyUser(filter, paginate);
  }

  @Public()
  @Get('/:id')
  @ApiOperation({ summary: 'Find One User', description: 'Find One User' })
  FindOne(@Param() param: UserParamsDTO) {
    return this.usersService.findOneUser(param.id);
  }

  @Public()
  @Patch('/:id')
  @ApiOperation({ summary: 'Update User', description: 'Update User' })
  update(@Param() param: UserParamsDTO, @Body() data: UpdateUserDTO) {
    return this.usersService.updateUser(param.id, data);
  }

  @Public()
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete User', description: 'Delete User' })
  delete(@Param() param: UserParamsDTO) {
    return this.usersService.deleteUser(param.id);
  }
}
