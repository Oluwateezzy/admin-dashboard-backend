import { ApiProperty } from '@nestjs/swagger';
import { BaseResultWithData } from './base-data.result';

export class BasePaginationResult extends BaseResultWithData {
  @ApiProperty({ type: () => Number })
  public totalDocuments?: number;

  @ApiProperty({ type: () => Number })
  public totalPages?: number;

  @ApiProperty({ type: () => Number })
  public currentPage?: number;

  @ApiProperty({ type: () => Number })
  public limit?: number;

  constructor(
    status: number,
    message: string,
    data: any,
    total?: number,
    limit?: number,
    currentPage?: number,
  ) {
    super(status, message, data);
    this.totalDocuments = total;
    this.limit = limit;
    this.currentPage = currentPage;
    if (total && limit) {
      this.totalPages = Math.ceil(total / limit);
    }
  }
}
