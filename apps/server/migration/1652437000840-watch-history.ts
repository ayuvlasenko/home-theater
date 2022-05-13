import {MigrationInterface, QueryRunner} from "typeorm";

export class watchHistory1652437000840 implements MigrationInterface {
    name = 'watchHistory1652437000840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "watch_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "currentTimeSeconds" double precision NOT NULL, "videoId" uuid, "userId" uuid, CONSTRAINT "UQ_a032d2fdcab463d76a5a04fb41b" UNIQUE ("videoId", "userId"), CONSTRAINT "PK_4a7d6381618ede4bcde39b5a708" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "watch_history" ADD CONSTRAINT "FK_a7dd569c1a027aa2028e4c357d0" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "watch_history" ADD CONSTRAINT "FK_f287ef6180d95d3bdae3916c968" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watch_history" DROP CONSTRAINT "FK_f287ef6180d95d3bdae3916c968"`);
        await queryRunner.query(`ALTER TABLE "watch_history" DROP CONSTRAINT "FK_a7dd569c1a027aa2028e4c357d0"`);
        await queryRunner.query(`DROP TABLE "watch_history"`);
    }

}
