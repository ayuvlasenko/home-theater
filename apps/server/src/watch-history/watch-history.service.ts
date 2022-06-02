import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "../user/user.service";
import { VideoService } from "../video/video.service";
import { WatchHistory } from "./watch-history.entity";

@Injectable()
export class WatchHistoryService {
    constructor(
        @InjectRepository(WatchHistory)
        private readonly watchHistoryRepository: Repository<WatchHistory>,
        private readonly userService: UserService,
        private readonly videoService: VideoService
    ) {}

    async createOrUpdate(options: {
        userId: string;
        videoId: string;
        currentTimeSeconds: number;
    }): Promise<void> {
        let watchHistory = await this.watchHistoryRepository.findOne({
            relations: ["video", "user"],
            where: {
                video: {
                    id: options.videoId,
                },
                user: {
                    id: options.userId,
                },
            },
        });

        if ( watchHistory === undefined ) {
            const user = await this.userService.findOne({ id: options.userId });
            const video = await this.videoService.findOne(options.videoId);

            watchHistory = this.watchHistoryRepository.create({ user, video });
        }

        watchHistory.currentTimeSeconds = options.currentTimeSeconds;

        await this.watchHistoryRepository.save(watchHistory);
    }

    async findOne(options: {
        userId: string;
        videoId: string;
    }): Promise<WatchHistory> {
        const watchHistory = await this.watchHistoryRepository.findOne({
            relations: ["video", "user"],
            where: {
                video: {
                    id: options.videoId,
                },
                user: {
                    id: options.userId,
                },
            },
        });

        if ( watchHistory === undefined ) {
            throw new NotFoundException("Watch history not found");
        }

        return watchHistory;
    }
}
