import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseResult {
  @ApiProperty({ type: () => Number })
  public status: number | HttpStatus;
  @ApiProperty({ type: () => String })
  public message: string;
  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}
