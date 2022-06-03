import type { Response } from "express";
import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService, AuthTokens } from "./auth.service";
import { CookieService, setResponseCookies } from "../cookie";
import { UserAgent } from "../common/http-header";
import { UserAgent as UserAgentDecorator } from "../common/http-header/decorator";
import { Public, Credentials } from "./decorator";
import { LocalGuard } from "./local";
import { SignUpDto } from "./dto";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly cookieService: CookieService
    ) {}

    @Post("sign-in")
    @Public()
    @UseGuards(LocalGuard)
    async singIn(
        @Credentials("userId") userId: string,
        @UserAgentDecorator() userAgent: UserAgent,
        @Res({ passthrough: true }) response: Response
    ): Promise<void> {
        const tokens = await this.authService.signIn({
            userId,
            userAgent,
        });

        this.setTokenCookies(response, tokens);
    }

    @Post("sign-up")
    @Public()
    async signUp(
        @Body() signUpDto: SignUpDto,
        @UserAgentDecorator() userAgent: UserAgent,
        @Res({ passthrough: true }) response: Response
    ): Promise<void> {
        const tokens = await this.authService.singUp(
            signUpDto,
            userAgent
        );

        this.setTokenCookies(response, tokens);
    }

    @Get("refresh")
    refresh(): void {
        // no need to do anything, because jwt.guard do all job
    }

    private setTokenCookies(response: Response, tokens: AuthTokens): void {
        const cookies = this.cookieService.buildByTokens(tokens);
        setResponseCookies(response, cookies);
    }
}
