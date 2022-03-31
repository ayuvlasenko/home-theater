import { join } from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./config/type-orm-config.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { VideoModule } from "./video/video.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "./authentication/jwt/jwt.guard";
import { CookieModule } from "./cookie/cookie.module";

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
        AuthenticationModule,
        CookieModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        },
    ],
})
export class AppModule {}
