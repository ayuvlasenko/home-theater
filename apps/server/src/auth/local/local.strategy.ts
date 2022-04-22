import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

interface Credentials {
    userId: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: "login",
            passwordField: "password",
        });
    }

    async validate(login: string, password: string): Promise<Credentials> {
        // todo: catch user not found exception
        const userId = await this.authService.validateUser(
            login,
            password
        );

        if ( userId === undefined ) {
            throw new UnauthorizedException();
        }

        return { userId };
    }
}
