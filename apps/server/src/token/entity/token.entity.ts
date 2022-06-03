import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "../../common/entity";
import { User } from "../../user/entity";

@Entity()
export class Token extends Base {
    @Column("text")
    value!: string;

    @Column("text")
    type!: string;

    @ManyToOne(() => User)
    user!: User;
}
