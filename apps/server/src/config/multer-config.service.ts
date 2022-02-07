import { Injectable } from "@nestjs/common";
import {
    MulterModuleOptions,
    MulterOptionsFactory,
} from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createMulterOptions(): MulterModuleOptions | Promise<MulterModuleOptions> {
        const filesDirectory = this.configService.get("FILES_DIRECTORY") as string;

        const storage = diskStorage({
            destination: (_req, _file, cb) => {
                cb(null, filesDirectory);
            },
            filename: (_req, file, cb) => {
                const extension = extname(file.originalname);
                cb(null, `${uuid()}${extension}`);
            },
        });

        return { storage };
    }

}
