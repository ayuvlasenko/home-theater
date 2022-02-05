import { Column, Entity } from "typeorm";
import { Base } from "../common/entity/base.entity";

@Entity()
export class File extends Base {
    @Column("text")
    name!: string;

    @Column("text")
    originalName!: string;
}
