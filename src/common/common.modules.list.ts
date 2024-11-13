import { ModuleMetadata } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenGuard } from "src/auth/strategies/jwt/guards";
import { Encryptor } from "src/libs/encryptor";
import { CommonService } from "./common.service";
import { PoliciesGuard } from "./guards/policies/policies.guard";

const metadata: ModuleMetadata = {
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            global: true,
            useFactory: async (configService: ConfigService) => ({
                secretOrPrivateKey: configService.getOrThrow<string>('jwt.secret'),
                signOptions: {
                    expiresIn: configService.getOrThrow<string>('jwt.expiresIn'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        Encryptor,
        {
            provide: APP_GUARD,
            useClass: AccessTokenGuard,
        },
        {
            provide: APP_GUARD,
            useClass: PoliciesGuard,
        },
        CommonService,
    ],
}

export default metadata;