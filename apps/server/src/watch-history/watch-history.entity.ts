import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { Base } from "../common/entity/base.entity";
import { Video } from "../video/video.entity";
import { User } from "../user/user.entity";

@Entity()
@Unique(["video", "user"])
export class WatchHistory extends Base {
    @Column("double precision")
    currentTimeSeconds!: number;

    @ManyToOne(() => Video)
    video!: Video;

    @ManyToOne(() => User)
    user!: User;
}
