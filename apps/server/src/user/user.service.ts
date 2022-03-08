import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.findByLogin(createUserDto.login);

        if ( existingUser !== undefined ) {
            throw new ConflictException("User already exists");
        }

        const user = this.userRepository.create(createUserDto);

        await this.userRepository.save(user);

        return user;
    }

    async findOne(options: {
        id?: string;
        login?: string;
    }): Promise<User> {
        let user: User | undefined;

        if ( options.id !== undefined ) {
            user = await this.userRepository.findOne(options.id);
        }

        if ( user === undefined && options.login !== undefined ) {
            user = await this.findByLogin(options.login);
        }

        if ( user === undefined ) {
            throw new NotFoundException("User not found");
        }

        return user;
    }

    private async findByLogin(login: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: { login },
        });
    }
}
