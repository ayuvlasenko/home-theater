import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { FileModule } from "../file";
import { WatchHistoryModule } from "../watch-history";
import { MulterConfigService } from "../config";
import { VideoService } from "./video.service";
import { VideoController } from "./video.controller";
import { Video } from "./entity";

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
