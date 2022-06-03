import {
    Column,
    Entity,
    ManyToOne,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Base } from "../../common/entity";
import { File } from "../../file/entity";

@Entity()
export class Video extends Base {
    @Column({
        type: "text",
        nullable: true,
    })
    name?: string | null;

    @Exclude()
    @ManyToOne(() => File)
    file!: File;
}
