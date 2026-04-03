import { sqliteTable, AnySQLiteColumn, text, integer } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const user = sqliteTable("user", {
	id: text().primaryKey().notNull(),
	name: text(),
	age: integer(),
	sex: text(),
	phonenumber: text(),
});

