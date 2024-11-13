import { CHECK_POLICIES_KEY } from '../../decorator/check-policies.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IPolicyConfig } from './policy.interface';
import { Role, User } from '@prisma/client';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyConfig = this.reflector.get<IPolicyConfig>(
      CHECK_POLICIES_KEY,
      context.getHandler(),
    );
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) return true;

    const requestUser = context.switchToHttp().getRequest().user;

    const userRole = requestUser ? requestUser.role : undefined;

    const { user, body } = context.switchToHttp().getRequest();

    return this.execPolicyHandler(policyConfig, user, body, userRole);
  }

  private execPolicyHandler(
    config: IPolicyConfig,
    user: User,
    body: Record<string, any>,
    userRole: Role,
  ) {
    if (!config) return false;

    if (config?.options?.restrictUserToOwnItems) {
      return body.userId === user.id || body.id === user.id;
    }

    return config.roles.includes(userRole);
  }
}
