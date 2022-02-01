import { ReadStream } from "fs";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
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
    private readonly maxChunkBytes: number;

    constructor(
        private readonly fileService: FileService,
        private readonly configService: ConfigService,
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>
    ) {
        this.maxChunkBytes = this.configService.get("MAX_VIDEO_CHUNK_BYTES") ?? 500000;
    }

    async stream(id: string, httpRange: HttpRange): Promise<VideoStream> {
        const video = await this.findOne(id);

        const { size } = await this.fileService.stat(video.file);

        const streamRange = this.calculateStreamRange(size, httpRange);

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

    private calculateStreamRange(size: number, httpRange: HttpRange): StreamRange {
        const lastByte = size - 1;

        const start = httpRange.start >= lastByte
            ? lastByte
            : httpRange.start;

        const chunkSize = Math.min(
            this.maxChunkBytes,
            lastByte - start,
            (httpRange.end ?? lastByte) - start
        );

        const end = start + chunkSize;

        return { start, end };
    }
}
