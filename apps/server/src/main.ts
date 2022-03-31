import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));

    app.setGlobalPrefix("api");

    const configService = app.get(ConfigService);
    const port = configService.get<number | undefined>("APP_PORT") ?? 8080;

    await app.listen(port);
}
void bootstrap();
