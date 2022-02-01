import { createReadStream, ReadStream, Stats } from "fs";
import { stat } from "fs/promises";
import { resolve } from "path";
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cache } from "cache-manager";

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
        private readonly configService: ConfigService,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {
        this.filesDirectory = this.configService.get("FILES_DIRECTORY") as string;
    }

    createReadStream(name: string, options?: ReadStreamOptions): ReadStream {
        return createReadStream(this.path(name), options);
    }

    async stat(name: string): Promise<FileStats> {
        const path = this.path(name);

        const stats = await this.cacheManager.get<Stats>(path)
            ?? await stat(path);

        await this.cacheManager.set(path, stats);

        return { size: stats.size };
    }

    private path(name: string): string {
        return resolve(this.filesDirectory, name);
    }
}
