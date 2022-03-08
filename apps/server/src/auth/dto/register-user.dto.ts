import { OmitType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "../../user/dto/create-user.dto";

export class RegisterUserDto extends OmitType(CreateUserDto, ["passwordHash"] as const) {
    @IsNotEmpty()
    @IsString()
    password!: string;
}
