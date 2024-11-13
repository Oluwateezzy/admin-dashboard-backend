import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { StrategyEnum } from '../../strategy.enums';
import { Encryptor } from '../../../../libs/encryptor';

@Injectable()
export class AccessTokenGuard extends AuthGuard(StrategyEnum.JWT) {
    constructor(
        private reflector: Reflector,
        private readonly encryptor: Encryptor,
    ) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        const req = context.switchToHttp().getRequest();

        this._decryptBearerToken(req);
        return super.canActivate(context);
    }

    private _decryptBearerToken(req: any) {
        const bearerToken = req.headers?.authorization;
        if (!bearerToken) return;

        const authString = req.headers?.authorization?.split(' ');
        if (authString?.length !== 2) return;
        const bearerString = authString[0];
        if (bearerString != 'Bearer') return;

        const token = authString[1];
        const decryptedToken = this.encryptor.decrypt(token);

        if (!decryptedToken) return;
        const decryptedBearerToken = `Bearer ${decryptedToken}`;
        req.headers.authorization = decryptedBearerToken;
    }
}
