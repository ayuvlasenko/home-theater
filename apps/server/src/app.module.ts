import { join } from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from "@nestjs/serve-static";
import { VideoModule } from "./video";
import { AuthModule } from "./auth";
import { CookieModule } from "./cookie";
import { envValidationSchema, TypeOrmConfigService } from "./config";

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: envValidationSchema,
        }),
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
        CookieModule,
    ],
})
export class AppModule {}
