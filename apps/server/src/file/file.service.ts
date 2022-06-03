import { createReadStream, ReadStream, Stats } from "fs";
import { stat } from "fs/promises";
import { resolve } from "path";
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cache } from "cache-manager";
import { ConfigService } from "@nestjs/config";
import { File } from "./entity";
import { CreateFileDto } from "./dto";

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
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {
        this.filesDirectory = this.configService.get("FILES_DIRECTORY") as string;
    }

    async create(createFileDto: CreateFileDto): Promise<File> {
        const file = this.fileRepository.create(createFileDto);

        await this.fileRepository.save(file);

        return file;
    }

    createReadStream(file: File, options?: ReadStreamOptions): ReadStream {
        return createReadStream(this.path(file.name), options);
    }

    async stat(file: File): Promise<FileStats> {
        const path = this.path(file.name);

        const stats = await this.cacheManager.get<Stats>(path)
            ?? await stat(path);

        await this.cacheManager.set(path, stats);

        return { size: stats.size };
    }

    private path(name: string): string {
        return resolve(this.filesDirectory, name);
    }
}
