import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  numeric,
  text,
  pgEnum,
  unique
} from "drizzle-orm/pg-core";
import { formsTable } from "./form";

export const fieldTypesEnum = pgEnum("field_type_enum", [
  "TEXT",
  "NUMBER",
  "YES_NO",
  "Password",
  "EMAIL",
]);

export const formFieldsTable = pgTable("form_fields", {
  id: uuid("id").primaryKey().defaultRandom(),

  label: varchar("label", { length: 100 }).notNull(),
  labelKey: varchar("label_key", { length: 100 }).notNull(),

  placeholder: varchar("placeholder", { length: 100 }),

  description: text("description"),

  isRequired: boolean("is_required").default(false).notNull(),

  index: numeric("index", { scale: 2 }).notNull(),

  type: fieldTypesEnum("type").notNull(),

  formId: uuid("form_id")
    .references(() => formsTable.id)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
},(table)=>{
  return {
    uniqueFormIndex: unique("unique_form_index").on(table.formId, table.index)
  }
});
