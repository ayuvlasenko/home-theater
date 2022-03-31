import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "../user/user.module";
import { TokenModule } from "../token/token.module";
import { CookieModule } from "../cookie/cookie.module";
import { JwtRefreshTokenModule } from "./jwt/jwt-refresh-token.module";
import { JwtAccessTokenModule } from "./jwt/jwt-access-token.module";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { LocalStrategy } from "./local/local.strategy";
import { JwtStrategy } from "./jwt/jwt.strategy";

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
    controllers: [AuthenticationController],
    providers: [AuthenticationService, LocalStrategy, JwtStrategy],
    exports: [AuthenticationService],
})
export class AuthenticationModule {}
