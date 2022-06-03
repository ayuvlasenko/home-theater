import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { EnvValidationSchema } from "./config";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));

    app.setGlobalPrefix("api");

    const configService: ConfigService<EnvValidationSchema, true> = app.get(ConfigService);
    const port = configService.get("APP_PORT", { infer: true });

    await app.listen(port);
}
void bootstrap();
