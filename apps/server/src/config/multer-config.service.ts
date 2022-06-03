import { Injectable } from "@nestjs/common";
import {
    MulterModuleOptions,
    MulterOptionsFactory,
} from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";
import { EnvValidationSchema } from "./env-validation-schema";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    constructor(
        private readonly configService: ConfigService<EnvValidationSchema, true>
    ) {}

    createMulterOptions(): MulterModuleOptions | Promise<MulterModuleOptions> {
        const filesDirectory = this.configService.get("FILES_DIRECTORY", { infer: true });

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
