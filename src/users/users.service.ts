import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from './dto/users.dto';
import { Prisma, Role, Status, User } from '@prisma/client';
import { FilterQueryDTO, PaginationQueryDTO } from './dto/filter-paginate.dto';
import { isEmail } from 'class-validator';
import { BaseResult, BaseResultWithData } from 'src/libs/results';
import { UpdateUserDTO } from './dto/update.user.dto';
import { Hasher } from 'src/libs/hasher';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hasher: Hasher,
  ) {}

  findByCondition(cond: Prisma.UserWhereInput) {
    const user = this.prisma.user.findFirst({
      where: cond,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  findManyByCondition(cond: Prisma.UserWhereInput) {
    return this.prisma.user.findMany({
      where: cond,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findManyByConditionWithQuery(
    filter?: FilterQueryDTO,
    query?: PaginationQueryDTO,
  ) {
    const { search, status } = filter;

    const userQuery: Prisma.UserWhereInput = {};

    if (status) {
      userQuery.status = status as Status;
    }

    if (search) {
      userQuery.OR = [
        {
          username: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const { page, limit } = query;
    const limitInt = parseInt(limit as string);
    const take = limitInt || 8;
    const skip = (page - 1) * take;
    const skipWithDefault = skip || 0;
    return this.prisma.user.findMany({
      where: userQuery,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: skipWithDefault,
      take,
    });
  }

  create(data: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async update(userId: string, data: Prisma.UserUncheckedUpdateInput) {
    await this.findByCondition({
      id: userId,
    });

    return this.prisma.user.update({
      where: { id: userId },
      data: data,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async delete(userId: string) {
    await this.findByCondition({
      id: userId,
    });
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async _throwIfEmailOrUsernameExists(data: {
    email: string;
    username: string;
  }) {
    if (
      data &&
      (await this.findByCondition({
        OR: [
          {
            email: data.email,
          },
          {
            username: data.username,
          },
        ],
      }))
    ) {
      throw new BadRequestException('Email or Username Already Exists');
    }
  }

  _throwIfEmailIsInvalid(email?: string) {
    if (email && !isEmail(email)) {
      throw new BadRequestException('Please use a valid email');
    }
  }

  async createUser(data: UserDTO) {
    await this._throwIfEmailIsInvalid(data.email);
    await this._throwIfEmailOrUsernameExists({
      email: data.email,
      username: data.username,
    });
    data.password = await this.hasher.hash(data.password);
    const user = await this.create(data);
    return new BaseResultWithData(HttpStatus.CREATED, 'User Created', user);
  }

  async findManyUser(filter: FilterQueryDTO, paginate: PaginationQueryDTO) {
    const users = await this.findManyByConditionWithQuery(filter, paginate);
    return new BaseResultWithData(HttpStatus.OK, 'Find Many Users', users);
  }

  async findOneUser(id: string) {
    const user = await this.findByCondition({
      id,
    });

    return new BaseResultWithData(HttpStatus.OK, 'Find One User', user);
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    const user = await this.update(id, data);
    return new BaseResultWithData(HttpStatus.OK, 'User Updated', user);
  }

  async updateUserRole(id: string, role: Role) {
    const user = await this.update(id, {
      role,
    });
    return new BaseResultWithData(HttpStatus.OK, 'User Role Updated', user);
  }

  async deleteUser(id: string) {
    await this.delete(id);
    return new BaseResult(HttpStatus.OK, 'User Deleted');
  }
}
