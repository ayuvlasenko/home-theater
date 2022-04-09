import {
    Body,
    Controller,
    Get,
    Post,
    Res,
    UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { AuthenticationService, AuthenticationTokens } from "./authentication.service";
import { CookieService } from "../cookie/cookie.service";
import { setResponseCookies } from "../cookie/set-response-cookies";
import { Credentials } from "./decorator/credentials.decorator";
import { UserAgent as UserAgentDecorator } from "./decorator/user-agent.decorator";
import { UserAgent } from "../common/http-header/parse-user-agent-header";
import { Public } from "./decorator/public.decorator";
import { LocalGuard } from "./local/local.guard";
import { RegisterUserDto } from "./dto/register-user.dto";

@Controller("authentication")
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly cookieService: CookieService
    ) {}

    @Post("login")
    @Public()
    @UseGuards(LocalGuard)
    async login(
        @Credentials("userId") userId: string,
        @UserAgentDecorator() userAgent: UserAgent,
        @Res({ passthrough: true }) response: Response
    ): Promise<void> {
        const tokens = await this.authenticationService.login({
            userId,
            userAgent,
        });

        this.setTokenCookies(response, tokens);
    }

    @Post("register")
    @Public()
    async register(
        @Body() registerUserDto: RegisterUserDto,
        @UserAgentDecorator() userAgent: UserAgent,
        @Res({ passthrough: true }) response: Response
    ): Promise<void> {
        const tokens = await this.authenticationService.register(
            registerUserDto,
            userAgent
        );

        this.setTokenCookies(response, tokens);
    }

    @Get("refresh")
    refresh(): void {
        console.log("refresh call");
        // no need to do anything, because jwt.guard do all job
    }

    private setTokenCookies(response: Response, tokens: AuthenticationTokens): void {
        const cookies = this.cookieService.buildByTokens(tokens);
        setResponseCookies(response, cookies);
    }
}
