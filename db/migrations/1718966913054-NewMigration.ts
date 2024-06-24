 import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1718966913054 implements MigrationInterface {
    name = 'NewMigration1718966913054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_info" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone" integer, "email" varchar NOT NULL, "employeeId" integer, CONSTRAINT "REL_f188a018423a2cc75535509ff9" UNIQUE ("employeeId"))`);
        await queryRunner.query(`CREATE TABLE "meeting" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "zoomUrl" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "managerId" integer)`);
        await queryRunner.query(`CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "employeeId" integer)`);
        await queryRunner.query(`CREATE TABLE "employee_meeting_meeting" ("employeeId" integer NOT NULL, "meetingId" integer NOT NULL, PRIMARY KEY ("employeeId", "meetingId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7817e5de9841bba2c7adc8b8dd" ON "employee_meeting_meeting" ("employeeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_082b1735769a3406ebc0162008" ON "employee_meeting_meeting" ("meetingId") `);
        await queryRunner.query(`CREATE TABLE "temporary_contact_info" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone" integer, "email" varchar NOT NULL, "employeeId" integer, CONSTRAINT "REL_f188a018423a2cc75535509ff9" UNIQUE ("employeeId"), CONSTRAINT "FK_f188a018423a2cc75535509ff97" FOREIGN KEY ("employeeId") REFERENCES "employee" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_contact_info"("id", "phone", "email", "employeeId") SELECT "id", "phone", "email", "employeeId" FROM "contact_info"`);
        await queryRunner.query(`DROP TABLE "contact_info"`);
        await queryRunner.query(`ALTER TABLE "temporary_contact_info" RENAME TO "contact_info"`);
        await queryRunner.query(`CREATE TABLE "temporary_employee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "managerId" integer, CONSTRAINT "FK_f4a920dfa304e096fad40e8c4a0" FOREIGN KEY ("managerId") REFERENCES "employee" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_employee"("id", "firstName", "managerId") SELECT "id", "firstName", "managerId" FROM "employee"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`ALTER TABLE "temporary_employee" RENAME TO "employee"`);
        await queryRunner.query(`CREATE TABLE "temporary_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "employeeId" integer, CONSTRAINT "FK_07278e1532a8daa462123fb7bc1" FOREIGN KEY ("employeeId") REFERENCES "employee" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_task"("id", "name", "employeeId") SELECT "id", "name", "employeeId" FROM "task"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`ALTER TABLE "temporary_task" RENAME TO "task"`);
        await queryRunner.query(`DROP INDEX "IDX_7817e5de9841bba2c7adc8b8dd"`);
        await queryRunner.query(`DROP INDEX "IDX_082b1735769a3406ebc0162008"`);
        await queryRunner.query(`CREATE TABLE "temporary_employee_meeting_meeting" ("employeeId" integer NOT NULL, "meetingId" integer NOT NULL, CONSTRAINT "FK_7817e5de9841bba2c7adc8b8dd5" FOREIGN KEY ("employeeId") REFERENCES "employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_082b1735769a3406ebc01620087" FOREIGN KEY ("meetingId") REFERENCES "meeting" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("employeeId", "meetingId"))`);
        await queryRunner.query(`INSERT INTO "temporary_employee_meeting_meeting"("employeeId", "meetingId") SELECT "employeeId", "meetingId" FROM "employee_meeting_meeting"`);
        await queryRunner.query(`DROP TABLE "employee_meeting_meeting"`);
        await queryRunner.query(`ALTER TABLE "temporary_employee_meeting_meeting" RENAME TO "employee_meeting_meeting"`);
        await queryRunner.query(`CREATE INDEX "IDX_7817e5de9841bba2c7adc8b8dd" ON "employee_meeting_meeting" ("employeeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_082b1735769a3406ebc0162008" ON "employee_meeting_meeting" ("meetingId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_082b1735769a3406ebc0162008"`);
        await queryRunner.query(`DROP INDEX "IDX_7817e5de9841bba2c7adc8b8dd"`);
        await queryRunner.query(`ALTER TABLE "employee_meeting_meeting" RENAME TO "temporary_employee_meeting_meeting"`);
        await queryRunner.query(`CREATE TABLE "employee_meeting_meeting" ("employeeId" integer NOT NULL, "meetingId" integer NOT NULL, PRIMARY KEY ("employeeId", "meetingId"))`);
        await queryRunner.query(`INSERT INTO "employee_meeting_meeting"("employeeId", "meetingId") SELECT "employeeId", "meetingId" FROM "temporary_employee_meeting_meeting"`);
        await queryRunner.query(`DROP TABLE "temporary_employee_meeting_meeting"`);
        await queryRunner.query(`CREATE INDEX "IDX_082b1735769a3406ebc0162008" ON "employee_meeting_meeting" ("meetingId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7817e5de9841bba2c7adc8b8dd" ON "employee_meeting_meeting" ("employeeId") `);
        await queryRunner.query(`ALTER TABLE "task" RENAME TO "temporary_task"`);
        await queryRunner.query(`CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "employeeId" integer)`);
        await queryRunner.query(`INSERT INTO "task"("id", "name", "employeeId") SELECT "id", "name", "employeeId" FROM "temporary_task"`);
        await queryRunner.query(`DROP TABLE "temporary_task"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME TO "temporary_employee"`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "managerId" integer)`);
        await queryRunner.query(`INSERT INTO "employee"("id", "firstName", "managerId") SELECT "id", "firstName", "managerId" FROM "temporary_employee"`);
        await queryRunner.query(`DROP TABLE "temporary_employee"`);
        await queryRunner.query(`ALTER TABLE "contact_info" RENAME TO "temporary_contact_info"`);
        await queryRunner.query(`CREATE TABLE "contact_info" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone" integer, "email" varchar NOT NULL, "employeeId" integer, CONSTRAINT "REL_f188a018423a2cc75535509ff9" UNIQUE ("employeeId"))`);
        await queryRunner.query(`INSERT INTO "contact_info"("id", "phone", "email", "employeeId") SELECT "id", "phone", "email", "employeeId" FROM "temporary_contact_info"`);
        await queryRunner.query(`DROP TABLE "temporary_contact_info"`);
        await queryRunner.query(`DROP INDEX "IDX_082b1735769a3406ebc0162008"`);
        await queryRunner.query(`DROP INDEX "IDX_7817e5de9841bba2c7adc8b8dd"`);
        await queryRunner.query(`DROP TABLE "employee_meeting_meeting"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "meeting"`);
        await queryRunner.query(`DROP TABLE "contact_info"`);
    }

}
