import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class PaginationQueryDTO {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  page: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  limit: string;
}

export class FilterQueryDTO {
  @ApiProperty({
    required: false,
    description: 'User Status',
    enum: Status,
  })
  @IsString()
  @IsOptional()
  status?: Status;

  @ApiProperty({ required: false, description: 'Search query' })
  @IsString()
  @IsOptional()
  search?: string;
}
