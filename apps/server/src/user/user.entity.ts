import { Column, Entity } from "typeorm";
import { Exclude } from "class-transformer";
import { Base } from "../common/entity/base.entity";

@Entity()
export class User extends Base {
    @Column("text")
    name!: string;

    @Column({
        type: "text",
        unique: true,
    })
    login!: string;

    @Column("text")
    @Exclude()
    passwordHash!: string;
}
