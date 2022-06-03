import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileService } from "./file.service";
import { File } from "./entity";

@Module({
    imports: [
        CacheModule.register(),
        TypeOrmModule.forFeature([File]),
        ConfigModule,
    ],
    providers: [FileService],
    exports: [FileService],
})
export class FileModule {}
