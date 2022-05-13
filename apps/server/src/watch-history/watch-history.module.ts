import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WatchHistory } from "./watch-history.entity";
import { VideoModule } from "../video/video.module";
import { UserModule } from "../user/user.module";
import { WatchHistoryService } from "./watch-history.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([WatchHistory]),
        forwardRef(() => VideoModule),
        UserModule,
    ],
    providers: [WatchHistoryService],
    exports: [WatchHistoryService],
})
export class WatchHistoryModule {}
