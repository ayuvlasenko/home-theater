import { join } from "path";
import { APP_GUARD } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./config/type-orm-config.service";
import { VideoModule } from "./video/video.module";
import { AuthModule } from "./auth/auth.module";
import { JwtGuard } from "./auth/strategy/jwt.guard";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeOrmConfigService,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "react-client"),
            exclude: ["/api*"],
        }),
        VideoModule,
        AuthModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        },
    ],
})
export class AppModule {}
