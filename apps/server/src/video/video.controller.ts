import type { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import {
    Controller, Get, Param, Res, Headers, HttpStatus, StreamableFile, Post,
    UseInterceptors, UploadedFile, Body, ClassSerializerInterceptor,
} from "@nestjs/common";
import { HttpRange, parseRangeHeader } from "../common/http-header";
import { RangeNotSatisfiableException } from "../common/http-header/exception";
import { Public, Credentials } from "../auth/decorator";
import { VideoService } from "./video.service";
import { WatchHistoryService } from "../watch-history";
import { Video } from "./entity";
import { WatchHistory } from "../watch-history/entity";
import { UploadVideoDto } from "./dto";
import { CreateWatchHistoryDto } from "../watch-history/dto";

@Controller("videos")
@UseInterceptors(ClassSerializerInterceptor)
export class VideoController {
    constructor(
        private readonly videoService: VideoService,
        private readonly watchHistoryService: WatchHistoryService
    ) {}

    @Get(":id/stream")
    @Public()
    async stream(
        @Param("id") id: string,
        @Res({ passthrough: true }) response: Response,
        @Headers("range") range?: string
    ): Promise<StreamableFile> {
        const httpRanges = parseRangeHeader(range);

        if ( httpRanges.length > 1 ) {
            throw new RangeNotSatisfiableException("Multiple ranges not supported");
        }

        const stream = await this.videoService.stream(
            id,
            httpRanges[0] as HttpRange
        );

        const { start, end } = stream.range;
        const contentRange = `bytes ${start}-${end}/${stream.size}`;
        const contentLength = end - start + 1;

        response.status(HttpStatus.PARTIAL_CONTENT);
        response.setHeader("Content-Range", contentRange);
        response.setHeader("Accept-Ranges", "bytes");
        response.setHeader("Content-Length", contentLength);
        response.setHeader("Content-Type", "video/mp4");

        return new StreamableFile(stream.readStream);
    }

    @Get()
    async findAll(): Promise<Video[]> {
        // todo: pagination
        return await this.videoService.findAll();
    }

    @Get(":id")
    async find(
        @Param("id") id: string
    ): Promise<Video> {
        return await this.videoService.findOne(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor("file"))
    async upload(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: UploadVideoDto
    ): Promise<Video> {
        // todo: validate file
        // todo: delete file on exception
        return await this.videoService.create({
            name: body.name,
            file: {
                name: file.filename,
                originalName: file.originalname,
            },
        });
    }

    @Post(":id/watch-history")
    async createOrUpdateWatchHistory(
        @Param("id") id: string,
        @Credentials("userId") userId: string,
        @Body() createWatchHistoryDto: CreateWatchHistoryDto
    ): Promise<void> {
        await this.watchHistoryService.createOrUpdate({
            userId,
            videoId: id,
            currentTimeSeconds: createWatchHistoryDto.currentTimeSeconds,
        });
    }

    @Get(":id/watch-history")
    async getWatchHistory(
        @Param("id") id: string,
        @Credentials("userId") userId: string
    ): Promise<WatchHistory> {
        return await this.watchHistoryService.findOne({ userId, videoId: id });
    }
}
