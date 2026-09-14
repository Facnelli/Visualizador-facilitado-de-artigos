import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const readingProgress = sqliteTable("reading_progress", {
  userId: text("user_id").notNull(),
  articleId: text("article_id").notNull(),
  desktopPage: integer("desktop_page").notNull().default(0),
  mobilePage: integer("mobile_page").notNull().default(0),
  updatedAt: text("updated_at").notNull(),
}, (table) => [primaryKey({ columns: [table.userId, table.articleId] })]);

export const highlights = sqliteTable("highlights", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  articleId: text("article_id").notNull(),
  blockId: text("block_id").notNull(),
  startOffset: integer("start_offset").notNull(),
  endOffset: integer("end_offset").notNull(),
  quote: text("quote").notNull(),
  color: text("color").notNull().default("yellow"),
  createdAt: text("created_at").notNull(),
});
