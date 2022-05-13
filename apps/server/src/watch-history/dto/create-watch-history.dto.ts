import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateWatchHistoryDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    currentTimeSeconds!: number;
}
