import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { Token } from "./token.entity";
import { CreateTokenDto } from "./dto/create-token.dto";

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private readonly tokenRepository: Repository<Token>,
        private readonly userService: UserService
    ) {}

    async create(createTokenDto: CreateTokenDto): Promise<Token> {
        const user = await this.userService.findOne({
            id: createTokenDto.userId,
        });

        const token = this.tokenRepository.create({
            type: createTokenDto.type,
            value: createTokenDto.value,
            user,
        });

        await this.tokenRepository.save(token);

        return token;
    }

    async findLast(options: { userId: string; type: string }): Promise<Token> {
        const token = await this.tokenRepository.findOne({
            relations: ["user"],
            where: {
                user: {
                    id: options.userId,
                },
                type: options.type,
            },
            order: {
                createdAt: "DESC",
            },
        });

        if ( token === undefined ) {
            throw new NotFoundException("Token not found");
        }

        return token;
    }
}
