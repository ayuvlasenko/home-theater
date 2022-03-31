import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "../common/entity/base.entity";
import { User } from "../user/user.entity";

@Entity()
export class Token extends Base {
    @Column("text")
    value!: string;

    @Column("text")
    type!: string;

    @ManyToOne(() => User)
    user!: User;
}
