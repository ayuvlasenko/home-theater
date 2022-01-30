import { createReadStream, ReadStream } from "fs";
import { stat } from "fs/promises";
import { resolve } from "path";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface FileStats {
    size: number;
}

interface ReadStreamOptions {
    start: number;
    end: number;
}

@Injectable()
export class FileService {
    private readonly filesDirectory: string;

    constructor(
        private readonly configService: ConfigService
    ) {
        this.filesDirectory = this.configService.get("FILES_DIRECTORY") as string;
    }

    createReadStream(name: string, options?: ReadStreamOptions): ReadStream {
        return createReadStream(this.path(name), options);
    }

    async stat(name: string): Promise<FileStats> {
        const stats = await stat(this.path(name));
        return { size: stats.size };
    }

    private path(name: string): string {
        return resolve(this.filesDirectory, name);
    }
}
