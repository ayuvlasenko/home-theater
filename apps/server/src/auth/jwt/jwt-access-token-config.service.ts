import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtAccessTokenConfigService implements JwtOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
        return {
            secret: this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
            signOptions: {
                expiresIn: this.configService.get<number | string>("JWT_ACCESS_TOKEN_EXPIRES_IN_MS"),
            },
        };
    }
}
