import { MigrationInterface, QueryRunner } from "typeorm"

export class Account1670769078060 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `account` (`id` int NOT NULL AUTO_INCREMENT, balance decimal(15,2) NOT NULL, user_id int NOT NULL, PRIMARY KEY (id));");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `account`;");
    }
}
