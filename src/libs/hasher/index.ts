import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { IHasher } from './hasher.interface';

@Injectable()
export class Hasher implements IHasher {
  async hash(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(plainPassword, salt);
  }

  async compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
