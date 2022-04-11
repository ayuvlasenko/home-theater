import { Module } from "@nestjs/common";
import { JWT_ACCESS_TOKEN_SERVICE } from "../../custom-provider.constants";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import {
    JwtAccessTokenConfigService,
} from "./jwt-access-token-config.service";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useClass: JwtAccessTokenConfigService,
        }),
    ],
    providers: [{
        provide: JWT_ACCESS_TOKEN_SERVICE,
        useExisting: JwtService,
    }],
    exports: [JWT_ACCESS_TOKEN_SERVICE],
})
export class JwtAccessTokenModule {}
