import { Role } from '@prisma/client';
import { Types } from 'mongoose';

export interface IJwtPayload {
  id: string;
  email: string;
  username: string;
  role: Role;
}
