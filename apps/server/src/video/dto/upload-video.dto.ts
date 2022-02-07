import { OmitType } from "@nestjs/mapped-types";
import { CreateVideoDto } from "./create-video.dto";

export class UploadVideoDto
    extends OmitType(CreateVideoDto, ["file"] as const) {}
