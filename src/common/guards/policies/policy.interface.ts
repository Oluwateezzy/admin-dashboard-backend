import { Role } from 'src/libs/enums/enum';

export interface IPolicyConfig {
  roles: Role[];
  options?: {
    restrictUserToOwnItems: boolean;
  };
}
