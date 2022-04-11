import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import {
    Controller,
    Get,
    Param,
    Res,
    Headers,
    HttpStatus,
    StreamableFile,
    Post,
    UseInterceptors,
    UploadedFile,
    Body,
    ClassSerializerInterceptor,
} from "@nestjs/common";
import {
    HttpRange,
    parseRangeHeader,
} from "../common/http-header/parse-range-header";
import {
    RangeNotSatisfiableException,
} from "../common/http-header/range-not-satisfiable.exception";
import { VideoService } from "./video.service";
import { UploadVideoDto } from "./dto/upload-video.dto";
import { Video } from "./video.entity";
import { Public } from "../auth/decorator/public.decorator";

@Controller("videos")
@UseInterceptors(ClassSerializerInterceptor)
export class VideoController {
    constructor(
        private readonly videoService: VideoService
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
}
