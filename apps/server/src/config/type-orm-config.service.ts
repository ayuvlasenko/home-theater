import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return {
            type: "postgres",
            host: this.configService.get("TYPEORM_HOST") as string,
            port: +this.configService.get("TYPEORM_PORT"),
            username: this.configService.get("TYPEORM_USERNAME") as string,
            password: this.configService.get("TYPEORM_PASSWORD") as string,
            database: this.configService.get("TYPEORM_DATABASE") as string,
            cache: this.configService.get("TYPEORM_CACHE") === "TRUE",
            autoLoadEntities: true,
        };
    }
}
