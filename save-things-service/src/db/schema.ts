import { pgTable } from "drizzle-orm/pg-core/table";
import { boolean, date, uuid, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  username: varchar("username", { length: 255 }),
  avatar: varchar("avatar", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  isAdmin: boolean("isAdmin").notNull().default(false),
  about: varchar("about"),
  createdAt: date("createdAt").notNull().defaultNow(),
});

export const playgroundTable = pgTable("playgrounds", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  env: varchar("env", { length: 255 }).notNull(),
  containerId: varchar("containerId", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 255 }),
  createdBy: varchar("createdBy", { length: 255 }).references(
    () => userTable.id
  ),

  sharedTo: uuid("sharedWith")
    .array()
    .references(() => userTable.id),
  isBrowserNeeded: boolean("isBrowserNeeded").notNull().default(false),
  createdAt: date("createdAt").notNull().defaultNow(),
});
