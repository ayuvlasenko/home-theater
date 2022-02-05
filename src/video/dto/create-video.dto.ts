import { CreateFileDto } from "../../file/dto/create-file.dto";

export class CreateVideoDto {
    name!: string;
    file!: CreateFileDto;
}
