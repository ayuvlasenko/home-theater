import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Video {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        type: "text",
        nullable: true,
    })
    name?: string | null;

    @Column("text")
    file!: string;

    @CreateDateColumn({
        type: "timestamp",
    })
    createdAt!: Date;

    @UpdateDateColumn({
        type: "timestamp",
    })
    updatedAt!: Date;
}
