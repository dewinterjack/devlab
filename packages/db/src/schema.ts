// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `devlab_${name}`);

export const repos = createTable(
  "repo",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    owner: varchar("owner", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    commit_sha: varchar("commit_sha", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => ({
    ownerNameIndex: index("owner_name_idx").on(table.owner, table.name),
  }),
);

export const readmes = createTable(
  "readme",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    repoId: integer("repo_id")
      .notNull()
      .references(() => repos.id),
    content: varchar("content", { length: 65535 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => ({
    repoIdIndex: index("repo_id_idx").on(table.repoId),
  }),
);
