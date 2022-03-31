import * as bcrypt from "bcrypt";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import {
    JWT_ACCESS_TOKEN_SERVICE,
    JWT_REFRESH_TOKEN_SERVICE,
} from "../custom-provider.constants";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { TokenService } from "../token/token.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { JwtPayload } from "./jwt/jwt.strategy";
import { UserAgent } from "../common/http-header/parse-user-agent-header";

export interface AuthenticationTokens {
    access: string;
    refresh: string;
}

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        @Inject(JWT_ACCESS_TOKEN_SERVICE)
        private readonly jwtAccessTokenService: JwtService,
        @Inject(JWT_REFRESH_TOKEN_SERVICE)
        private readonly jwtRefreshTokenService: JwtService
    ) {}

    async validateUser(
        login: string,
        password: string
    ): Promise<string | undefined> {
        const user = await this.userService.findOne({ login });

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if ( !isMatch ) {
            return;
        }

        return user.id;
    }

    async register(
        registerUserDto: RegisterUserDto,
        userAgent: UserAgent
    ): Promise<AuthenticationTokens> {
        const user = await this.userService.create({
            login: registerUserDto.login,
            name: registerUserDto.name,
            passwordHash: await hash(registerUserDto.password),
        });

        return await this.issueTokens({
            userId: user.id,
            userAgent,
        });
    }

    async login(options: {
        userId: string;
        userAgent: UserAgent;
    }): Promise<AuthenticationTokens> {
        return await this.issueTokens(options);
    }

    async refreshTokens(options: {
        refreshToken: string;
        userAgent: UserAgent;
    }): Promise<AuthenticationTokens> {
        const payload = await this.jwtRefreshTokenService.verifyAsync<JwtPayload>(
            options.refreshToken
        );

        const existingToken = await this.tokenService.findLast({
            userId: payload.sub,
            type: options.userAgent,
        });

        const isMatch = await bcrypt.compare(
            options.refreshToken,
            existingToken.value
        );
        if ( !isMatch ) {
            throw new UnauthorizedException();
        }

        return await this.issueTokens({
            userId: payload.sub,
            userAgent: options.userAgent,
        });
    }

    private async issueTokens(options: {
        userId: string;
        userAgent: UserAgent;
    }): Promise<AuthenticationTokens> {
        const payload: JwtPayload = { sub: options.userId };

        const tokens: AuthenticationTokens = {
            access: await this.jwtAccessTokenService.signAsync(payload),
            refresh: await this.jwtRefreshTokenService.signAsync(payload),
        };

        await this.tokenService.create({
            userId: options.userId,
            type: options.userAgent,
            value: await hash(tokens.refresh),
        });

        return tokens;
    }

}
// todo: move to service
async function hash(some: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(some, saltOrRounds);
}
