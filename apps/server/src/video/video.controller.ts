// express import is used as type
// eslint-disable-next-line node/no-extraneous-import
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
} from "../common/controller/parse-range-header";
import {
    RangeNotSatisfiableException,
} from "../common/controller/range-not-satisfiable.exception";
import { VideoService } from "./video.service";
import { UploadVideoDto } from "./dto/upload-video.dto";
import { Video } from "./video.entity";

@Controller("videos")
@UseInterceptors(ClassSerializerInterceptor)
export class VideoController {
    constructor(
        private readonly videoService: VideoService
    ) {}

    @Get(":id/stream")
    async stream(
        @Param("id") id: string,
        @Res({ passthrough: true }) res: Response,
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

        res.status(HttpStatus.PARTIAL_CONTENT);
        res.setHeader("Content-Range", contentRange);
        res.setHeader("Accept-Ranges", "bytes");
        res.setHeader("Content-Length", contentLength);
        res.setHeader("Content-Type", "video/mp4");

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
