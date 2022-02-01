import { ReadStream } from "fs";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Video } from "./video.entity";
import { HttpRange } from "../common/controller/parse-range-header";
import { FileService } from "../file/file.service";

export interface VideoStream {
    readStream: ReadStream;
    range: StreamRange;
    size: number;
}

export interface StreamRange {
    start: number;
    end: number;
}

@Injectable()
export class VideoService {
    constructor(
        private readonly fileService: FileService,
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>
    ) {}

    async stream(id: string, httpRange: HttpRange): Promise<VideoStream> {
        const video = await this.findOne(id);

        const { size } = await this.fileService.stat(video.file);

        const streamRange: StreamRange = {
            start: httpRange.start,
            end: httpRange.end ?? size - 1,
        };

        const readStream = this.fileService.createReadStream(
            video.file,
            streamRange
        );

        return {
            range: streamRange,
            size,
            readStream,
        };
    }

    async findOne(id: string): Promise<Video> {
        const video = await this.videoRepository.findOne(id, {
            cache: true,
        });

        if ( video === undefined ) {
            throw new NotFoundException("Video not found");
        }

        return video;
    }
}
