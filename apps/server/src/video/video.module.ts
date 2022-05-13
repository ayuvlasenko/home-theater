import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfigService } from "../config/multer-config.service";
import { VideoController } from "./video.controller";
import { VideoService } from "./video.service";
import { Video } from "./video.entity";
import { FileModule } from "../file/file.module";
import { WatchHistoryModule } from "../watch-history/watch-history.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Video]),
        ConfigModule,
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useClass: MulterConfigService,
        }),
        FileModule,
        forwardRef(() => WatchHistoryModule),
    ],
    controllers: [VideoController],
    providers: [VideoService],
    exports: [VideoService],
})
export class VideoModule {}
