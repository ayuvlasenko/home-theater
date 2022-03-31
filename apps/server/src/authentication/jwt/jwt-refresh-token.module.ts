import { Module } from "@nestjs/common";
import { JWT_REFRESH_TOKEN_SERVICE } from "../../custom-provider.constants";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import {
    JwtRefreshTokenConfigService,
} from "./jwt-refresh-token-config.service";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useClass: JwtRefreshTokenConfigService,
        }),
    ],
    providers: [{
        provide: JWT_REFRESH_TOKEN_SERVICE,
        useExisting: JwtService,
    }],
    exports: [JWT_REFRESH_TOKEN_SERVICE],
})
export class JwtRefreshTokenModule {}
