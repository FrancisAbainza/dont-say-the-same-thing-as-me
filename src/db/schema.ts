import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const rankings = pgTable("rankings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  score: integer("score").notNull(),
});