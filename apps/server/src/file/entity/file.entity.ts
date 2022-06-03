import { Column, Entity } from "typeorm";
import { Base } from "../../common/entity";

@Entity()
export class File extends Base {
    @Column("text")
    name!: string;

    @Column("text")
    originalName!: string;
}
