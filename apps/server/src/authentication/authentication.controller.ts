import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    Res,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
// eslint-disable-next-line node/no-extraneous-import
import { Response } from "express";
import { AuthenticationService, AuthenticationTokens } from "./authentication.service";
import { CookieService } from "../cookie/cookie.service";
import { setResponseCookies } from "../cookie/set-response-cookies";
import { Credentials } from "./decorator/credentials.decorator";
import { Public } from "./decorator/public.decorator";
import { LocalGuard } from "./local/local.guard";
import { RegisterUserDto } from "./dto/register-user.dto";

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
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
        @Res({ passthrough: true }) response: Response
    ): Promise<void> {
        const tokens = await this.authenticationService.login({
            userId,
            deviceType: "desktop",
        });

        this.setTokenCookies(response, tokens);
    }

    @Post("register")
    @Public()
    async register(
        @Body() registerUserDto: RegisterUserDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<void> {
        const tokens = await this.authenticationService.register(
            registerUserDto,
            "desktop"
        );

        this.setTokenCookies(response, tokens);
    }

    private setTokenCookies(response: Response, tokens: AuthenticationTokens): void {
        const cookies = this.cookieService.buildByTokens(tokens);
        setResponseCookies(response, cookies);
    }
}