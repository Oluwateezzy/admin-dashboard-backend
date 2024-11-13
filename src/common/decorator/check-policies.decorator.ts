import { IPolicyConfig } from '../guards/policies/policy.interface';
import { SetMetadata } from '@nestjs/common';

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (config: IPolicyConfig) =>
    SetMetadata(CHECK_POLICIES_KEY, config);
