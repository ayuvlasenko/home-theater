import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";

export interface JwtPayload {
    sub: string;
}

interface Credentials {
    userId: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_ACCESS_TOKEN_SECRET") as string,
        });
    }

    validate(payload: JwtPayload): Credentials {
        return { userId: payload.sub };
    }
}
