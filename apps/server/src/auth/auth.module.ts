import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "../user";
import { TokenModule } from "../token";
import { CookieModule } from "../cookie";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import {
    JwtRefreshTokenModule,
    JwtAccessTokenModule,
    JwtStrategy,
    JwtGuard,
} from "./jwt";
import { LocalStrategy } from "./local";

@Module({
    imports: [
        ConfigModule,
        UserModule,
        TokenModule,
        CookieModule,
        PassportModule.register({
            property: "credentials",
        }),
        JwtRefreshTokenModule,
        JwtAccessTokenModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}
