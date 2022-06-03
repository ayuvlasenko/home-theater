import { CreateFileDto } from "../../file/dto";

export class CreateVideoDto {
    name!: string;
    file!: CreateFileDto;
}
