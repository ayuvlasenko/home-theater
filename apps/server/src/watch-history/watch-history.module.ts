import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VideoModule } from "../video";
import { UserModule } from "../user";
import { WatchHistoryService } from "./watch-history.service";
import { WatchHistory } from "./entity";

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
