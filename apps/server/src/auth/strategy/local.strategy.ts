import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "../../user/user.entity";

export interface Credentials {
    user: User;
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
        const user = await this.authService.validateUser(login, password);

        if ( user === undefined ) {
            throw new UnauthorizedException();
        }

        return { user };
    }
}
