import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user";
import { TokenService } from "./token.service";
import { Token } from "./entity";

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([Token]),
    ],
    providers: [TokenService],
    exports: [TokenService],
})
export class TokenModule {}
