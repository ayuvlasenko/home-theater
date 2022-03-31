import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticationService } from "../authentication.service";

interface Credentials {
    userId: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authenticationService: AuthenticationService) {
        super({
            usernameField: "login",
            passwordField: "password",
        });
    }

    async validate(login: string, password: string): Promise<Credentials> {
        const userId = await this.authenticationService.validateUser(
            login,
            password
        );

        if ( userId === undefined ) {
            throw new UnauthorizedException();
        }

        return { userId };
    }
}
