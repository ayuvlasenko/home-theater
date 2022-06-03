import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvValidationSchema } from "../../config";

export interface JwtPayload {
    sub: string;
}

interface Credentials {
    userId: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService<EnvValidationSchema, true>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_ACCESS_TOKEN_SECRET", { infer: true }),
        });
    }

    validate(payload: JwtPayload): Credentials {
        return { userId: payload.sub };
    }
}
