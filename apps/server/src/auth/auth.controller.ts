import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { AuthService, LoginResult } from "./auth.service";
import { User } from "../user/user.entity";
import { Credentials } from "./decorator/credentials.decorator";
import { RegisterUserDto } from "./dto/register-user.dto";
import { Public } from "./decorator/public.decorator";
import { LocalGuard } from "./strategy/local.guard";

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @Public()
    @UseGuards(LocalGuard)
    async login(@Credentials("user") user: User): Promise<LoginResult> {
        return await this.authService.login(user);
    }

    @Post("register")
    @Public()
    async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
        return await this.authService.register(registerUserDto);
    }
}
