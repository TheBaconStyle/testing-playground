import { relations } from "drizzle-orm";
import {
  boolean,
  pgSchema,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const dbSchema = pgSchema(process.env.DB_SCHEMA!);

export const users = dbSchema.table("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  verificationTokens: many(verificationTokens),
  sessions: many(sessions),
}));

export const accounts = dbSchema.table(
  "accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 16 }).notNull(),
    provider: varchar("provider", { length: 256 }).notNull(),
    providerAccountId: varchar("provider_ccount_id", { length: 256 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 256 }),
    access_token: varchar("access_token", { length: 256 }),
    expires_at: timestamp("expires_at", { mode: "date" }),
    token_type: varchar("token_type", { length: 256 }),
    scope: varchar("scope", { length: 256 }),
    id_token: varchar("id_token", { length: 256 }),
    session_state: varchar("session_state", { length: 256 }),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = dbSchema.table("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = dbSchema.table("verification_tokens", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().primaryKey(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokensRelations = relations(
  verificationTokens,
  ({ one }) => ({
    user: one(users, {
      fields: [verificationTokens.userId],
      references: [users.id],
    }),
  })
);

export const habits = dbSchema.table("habits", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 256 }).notNull(),
  codeName: varchar("code_name", { length: 256 }).notNull(),
  description: text("description"),
  icon: text("icon"),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const habitsRelations = relations(habits, ({ many }) => ({
  streaks: many(streaks),
  categories: many(habitCategories),
  checkmarks: many(habitCheckmarks),
}));

export const habitCheckmarks = dbSchema.table("habit_checkmarks", {
  id: uuid("id").primaryKey().defaultRandom(),
  habitId: uuid("habit_id").notNull(),
  date: timestamp("date", { mode: "date", withTimezone: true }).notNull(),
  value: boolean("checked").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
});

export const habitCheckmarksRelations = relations(
  habitCheckmarks,
  ({ one }) => ({
    habit: one(habits, {
      fields: [habitCheckmarks.habitId],
      references: [habits.id],
    }),
  })
);

export const categories = dbSchema.table("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  codeName: varchar("code_name", { length: 256 }).notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  habits: many(habitCategories),
  parentCategories: many(categoriesToCategories),
  childCategories: many(categoriesToCategories),
}));

export const habitCategories = dbSchema.table(
  "habit_categories",
  {
    habitId: uuid("habit_id")
      .references(() => habits.id)
      .notNull(),
    categoryId: uuid("category_id")
      .references(() => categories.id)
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.categoryId, t.habitId] })]
);

export const habitCategoriesRelations = relations(
  habitCategories,
  ({ one }) => ({
    habit: one(habits, {
      fields: [habitCategories.habitId],
      references: [habits.id],
    }),
    category: one(categories, {
      fields: [habitCategories.categoryId],
      references: [categories.id],
    }),
  })
);

export const categoriesToCategories = dbSchema.table(
  "categories_to_categories",
  {
    parentCategoryId: uuid("parent_category_id")
      .references(() => categories.id)
      .notNull(),
    childCategoryId: uuid("child_category_id")
      .references(() => categories.id)
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.childCategoryId, t.parentCategoryId] })]
);

export const categoriesToCategoriesRelations = relations(
  categoriesToCategories,
  ({ one }) => ({
    parentCategory: one(categories, {
      fields: [categoriesToCategories.parentCategoryId],
      references: [categories.id],
    }),
    childCategory: one(categories, {
      fields: [categoriesToCategories.childCategoryId],
      references: [categories.id],
    }),
  })
);

export const reminders = dbSchema.table("reminders", {
  id: uuid("id").primaryKey().defaultRandom(),
  habitId: uuid("habit_id").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  }).$onUpdate(() => new Date()),
});

export const remindersRelations = relations(reminders, ({ one }) => ({
  habit: one(habits, { fields: [reminders.habitId], references: [habits.id] }),
}));

export const streaks = dbSchema.table("streaks", {
  id: uuid("id").primaryKey().defaultRandom(),
  habitId: uuid("habit_id").notNull(),
  start_date: timestamp("start_date", { mode: "date", withTimezone: true }),
  end_date: timestamp("end_date", { mode: "date", withTimezone: true }),
});

export const streaksRelations = relations(streaks, ({ one }) => ({
  habit: one(habits, { fields: [streaks.habitId], references: [habits.id] }),
}));
