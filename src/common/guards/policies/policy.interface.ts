import { Role } from '@prisma/client';

export interface IPolicyConfig {
  roles: Role[];
  options?: {
    restrictUserToOwnItems: boolean;
  };
}
