import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));

    const configService = app.get(ConfigService);
    const port = configService.get<number | undefined>("APP_PORT") ?? 8080;

    await app.listen(port);
}
void bootstrap();
