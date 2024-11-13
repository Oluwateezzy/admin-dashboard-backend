import { BaseResult } from './base.result';

export class BaseResultWithData extends BaseResult {
  public data?: unknown;

  constructor(status: number, message: string, data?: unknown | null) {
    super(status, message);
    this.data = data;
  }
}
