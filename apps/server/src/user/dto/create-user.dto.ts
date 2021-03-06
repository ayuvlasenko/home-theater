import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    login!: string;

    @IsNotEmpty()
    @IsString()
    passwordHash!: string;
}
