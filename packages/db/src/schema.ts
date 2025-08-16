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

export const user = dbSchema.table("user", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
  role: text("role").default("user"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires", { withTimezone: true, mode: "date" }),
  username: text("username"),
  displayUsername: text("display_username"),
});

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
}));

export const account = dbSchema.table("account", {
  id: uuid("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade", onUpdate: 'cascade' }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const session = dbSchema.table("session", {
  id: uuid("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const verification = dbSchema.table("verification", {
  id: uuid("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});

export const habit = dbSchema.table("habit", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
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

export const habitRelations = relations(habit, ({ many }) => ({
  streaks: many(streak),
  categories: many(habitCategory),
  checkmarks: many(habitCheckmark),
  reminders: many(reminder),
}));

export const habitCheckmark = dbSchema.table("habit_checkmark", {
  id: uuid("id").primaryKey().defaultRandom(),
  habitId: uuid("habit_id")
    .notNull()
    .references(() => habit.id, { onDelete: "cascade", onUpdate: "cascade" }),
  date: timestamp("date", { mode: "date", withTimezone: true }).notNull(),
  value: boolean("checked").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
});

export const habitCheckmarksRelations = relations(
  habitCheckmark,
  ({ one }) => ({
    habit: one(habit, {
      fields: [habitCheckmark.habitId],
      references: [habit.id],
    }),
  })
);

export const category = dbSchema.table("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  codeName: varchar("code_name", { length: 256 }).notNull(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  habits: many(habitCategory),
  parentCategories: many(categoryToCategory),
  childCategories: many(categoryToCategory),
}));

export const habitCategory = dbSchema.table(
  "habit_category",
  {
    habitId: uuid("habit_id")
      .references(() => habit.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
    categoryId: uuid("category_id")
      .references(() => category.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.categoryId, t.habitId] })]
);

export const habitCategoryRelations = relations(habitCategory, ({ one }) => ({
  habit: one(habit, {
    fields: [habitCategory.habitId],
    references: [habit.id],
  }),
  category: one(category, {
    fields: [habitCategory.categoryId],
    references: [category.id],
  }),
}));

export const categoryToCategory = dbSchema.table(
  "category_to_category",
  {
    parentCategoryId: uuid("parent_category_id")
      .references(() => category.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    childCategoryId: uuid("child_category_id")
      .references(() => category.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.childCategoryId, t.parentCategoryId] })]
);

export const categoryToCategoryRelations = relations(
  categoryToCategory,
  ({ one }) => ({
    parentCategory: one(category, {
      fields: [categoryToCategory.parentCategoryId],
      references: [category.id],
    }),
    childCategory: one(category, {
      fields: [categoryToCategory.childCategoryId],
      references: [category.id],
    }),
  })
);

export const reminder = dbSchema.table("reminder", {
  id: uuid("id").primaryKey().defaultRandom(),
  habitId: uuid("habit_id")
    .notNull()
    .references(() => habit.id, { onDelete: "cascade", onUpdate: "cascade" }),
  message: text("message"),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  }).$onUpdate(() => new Date()),
});

export const remindersRelations = relations(reminder, ({ one }) => ({
  habit: one(habit, { fields: [reminder.habitId], references: [habit.id] }),
}));

export const streak = dbSchema.table("streak", {
  id: uuid("id").primaryKey().defaultRandom(),
  habitId: uuid("habit_id")
    .notNull()
    .references(() => habit.id, { onDelete: "cascade", onUpdate: "cascade" }),
  start_date: timestamp("start_date", { mode: "date", withTimezone: true }),
  end_date: timestamp("end_date", { mode: "date", withTimezone: true }),
});

export const streakRelations = relations(streak, ({ one }) => ({
  habit: one(habit, { fields: [streak.habitId], references: [habit.id] }),
}));
