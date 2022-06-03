import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { EnvValidationSchema } from "../../config";

@Injectable()
export class JwtRefreshTokenConfigService implements JwtOptionsFactory {
    constructor(
        private readonly configService: ConfigService<EnvValidationSchema, true>
    ) {}

    createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
        return {
            secret: this.configService.get("JWT_REFRESH_TOKEN_SECRET", { infer: true }),
            signOptions: {
                expiresIn: this.configService.get("JWT_REFRESH_TOKEN_EXPIRES_IN_MS", { infer: true }),
            },
        };
    }
}
