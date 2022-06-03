import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthTokens } from "../auth";
import { EnvValidationSchema } from "../config";

export interface Cookie {
    readonly name: string;
    readonly value: string;
    readonly httpOnly: boolean;
    readonly path: string;
    readonly maxAgeMs: number;
    readonly sameSite: "lax" | "none" | "strict";
}

@Injectable()
export class CookieService {
    private readonly accessTokenName: string;
    private readonly accessTokenMaxAgeMs: number;
    private readonly refreshTokenName: string;
    private readonly refreshTokenMaxAgeMs: number;

    constructor(configService: ConfigService<EnvValidationSchema, true>) {
        this.accessTokenName = configService.get("ACCESS_TOKEN_COOKIE", { infer: true });
        this.accessTokenMaxAgeMs = configService.get("JWT_ACCESS_TOKEN_EXPIRES_IN_MS", { infer: true });
        this.refreshTokenName = configService.get("REFRESH_TOKEN_COOKIE", { infer: true });
        this.refreshTokenMaxAgeMs = configService.get("JWT_REFRESH_TOKEN_EXPIRES_IN_MS", { infer: true });
    }

    buildByTokens(tokens: AuthTokens): Cookie[] {
        const cookies: Cookie[] = [];

        cookies.push({
            name: this.accessTokenName,
            value: tokens.access,
            httpOnly: true,
            path: "/",
            maxAgeMs: this.accessTokenMaxAgeMs,
            sameSite: "strict",
        });

        cookies.push({
            name: this.refreshTokenName,
            value: tokens.refresh,
            httpOnly: true,
            path: "/",
            maxAgeMs: this.refreshTokenMaxAgeMs,
            sameSite: "strict",
        });

        return cookies;
    }

}
