import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { TaskState } from "../../interface";

export default class extends BaseSchema {
  protected tableName = "tasks";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("user_id").references("id").inTable("users");
      table.string("name");
      table.string("description").defaultTo(null);
      table
        .enum("state", Object.values(TaskState))
        .defaultTo(TaskState.PENDING)
        .notNullable();
      table.string("color").defaultTo(null);
      table.timestamp("limit_at").nullable().defaultTo(null);

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });

      table.dateTime("deleted_at").defaultTo(null);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
