import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FileService } from "./file.service";

@Module({
    imports: [
        CacheModule.register(),
        ConfigModule,
    ],
    providers: [FileService],
    exports: [FileService],
})
export class FileModule {}
