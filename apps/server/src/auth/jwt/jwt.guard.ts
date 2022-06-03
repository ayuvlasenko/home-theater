import type { Request, Response } from "express";
import { Reflector } from "@nestjs/core";
import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { AuthService, AuthTokens } from "../auth.service";
import { CookieService, setResponseCookies } from "../../cookie";
import { IS_PUBLIC_KEY } from "../decorator";
import { parseUserAgentHeader, UserAgent } from "../../common/http-header";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") {
    constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService,
        private readonly cookieService: CookieService,
        private readonly configService: ConfigService
    ) {
        super();
    }

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        if ( this.isPublicRoute(context) ) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();
        if ( request.headers.authorization === undefined ) {
            this.setBearerTokenFromCookies(request);
        }

        const parentCanActivate = await this.tryParentCanActivate(context);
        if ( !parentCanActivate ) {
            const userAgent = parseUserAgentHeader(request.headers["user-agent"]);
            const tokens = await this.tryRefreshTokens(request, userAgent);
            setBearerToken(request, tokens.access);

            const response = context.switchToHttp().getResponse<Response>();
            const cookies = this.cookieService.buildByTokens(tokens);
            setResponseCookies(response, cookies);
        }

        return await this.tryParentCanActivate(context);
    }

    private isPublicRoute(context: ExecutionContext): boolean {
        return this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ]
        );
    }

    private setBearerTokenFromCookies(request: Request): void {
        const accessToken = this.extractAccessToken(request);

        if ( accessToken === undefined ) {
            return;
        }

        setBearerToken(request, accessToken);
    }

    private extractAccessToken(request: Request): string | undefined {
        return extractRequestCookie(
            request,
            this.configService.get("ACCESS_TOKEN_COOKIE") as string
        );
    }

    private async tryParentCanActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        try {
            return await (super.canActivate(context) as Promise<boolean>);
        }
        catch {
            // todo: log auth error
            return false;
        }
    }

    private async tryRefreshTokens(
        request: Request,
        userAgent: UserAgent
    ): Promise<AuthTokens> {
        const refreshToken = this.extractRefreshToken(request);

        if ( refreshToken === undefined ) {
            throw new UnauthorizedException();
        }

        try {
            return await this.authService.refreshTokens({
                refreshToken,
                userAgent,
            });
        }
        catch {
            // todo: log exception
            throw new UnauthorizedException();
        }
    }

    private extractRefreshToken(request: Request): string | undefined {
        return extractRequestCookie(
            request,
            this.configService.get("REFRESH_TOKEN_COOKIE") as string
        );
    }

}

function setBearerToken(request: Request, bearerToken: string): void {
    request.headers.authorization = `Bearer ${bearerToken}`;
}

export function extractRequestCookie(
    request: Request,
    name: string
): string | undefined {
    if (
        isObject(request.cookies)
        && name in request.cookies
    ) {
        const cookie = request.cookies[name];

        if ( typeof cookie === "string" ) {
            return cookie;
        }
    }
}

function isObject(some: unknown): some is { [key: string]: unknown } {
    return typeof some === "object" && some !== null && !Array.isArray(some);
}
