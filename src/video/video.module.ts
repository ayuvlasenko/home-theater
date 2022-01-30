import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { VideoController } from "./video.controller";
import { VideoService } from "./video.service";
import { Video } from "./video.entity";
import { FileModule } from "../file/file.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Video]),
        ConfigModule,
        FileModule,
    ],
    controllers: [VideoController],
    providers: [VideoService],
})
export class VideoModule {}
