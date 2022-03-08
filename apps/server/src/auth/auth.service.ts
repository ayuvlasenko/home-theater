import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto } from "./dto/register-user.dto";

export interface LoginResult {
    token: string;
}
export interface JwtPayload {
    sub: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(
        login: string,
        password: string
    ): Promise<User | undefined> {
        const user = await this.userService.findOne({ login });

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if ( !isMatch ) {
            return;
        }

        return user;
    }

    async login(user: User): Promise<LoginResult> {
        const payload: JwtPayload = { sub: user.id };
        return { token: await this.jwtService.signAsync(payload) };
    }

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        const saltOrRounds = 10;
        const passwordHash = await bcrypt.hash(
            registerUserDto.password,
            saltOrRounds
        );

        return await this.userService.create({
            login: registerUserDto.login,
            name: registerUserDto.name,
            passwordHash,
        });
    }
}
