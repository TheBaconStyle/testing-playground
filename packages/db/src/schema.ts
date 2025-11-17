import { relations } from "drizzle-orm";
import { uniqueIndex } from 'drizzle-orm/pg-core';
import { primaryKey } from 'drizzle-orm/pg-core';
import { enumToPgEnum } from './utils/toPgEnum';
import {
  boolean,
  integer,
  pgSchema,
  text,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

export const dbSchema = pgSchema("example");

export const user = dbSchema.table("user", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
    .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
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

export enum EHabitTypes {
  BINARY = 'binary',
  COUNTABLE = 'countable',
  MEASURABLE = 'measurable'
}

export const habitTypeEnum = dbSchema.enum('habit_types', enumToPgEnum(EHabitTypes))

export const habit = dbSchema.table("habit", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  name: varchar("name", { length: 256 }).notNull(),
  codeName: varchar("code_name", { length: 256 }).notNull(),
  description: text("description"),
  type: habitTypeEnum("type").notNull().default(EHabitTypes.BINARY),
  icon: text("icon"),
  start: timestamp("start", {
    mode: "date",
    withTimezone: true,
  }).notNull().defaultNow(),
  finish: timestamp("finish", {
    mode: "date",
    withTimezone: true,
  }),
  reminderRule: text("reminder_rule"),
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
}, (t)=>[
  primaryKey({ columns: [t.id, t.codeName] })
]);

export const habitRelations = relations(habit, ({ many }) => ({
  checkmarks: many(habitCheckmark),
}));

export const habitCheckmark = dbSchema.table("habit_checkmark", {
  id: uuid("id").primaryKey().defaultRandom(),
  habitId: uuid("habit_id")
    .notNull()
    .references(() => habit.id, { onDelete: "cascade", onUpdate: "cascade" }),
  date: timestamp("date", { mode: "date", withTimezone: true }).notNull(),
  progressValue: boolean("progressValue").notNull(),
  percentage: integer('percentage'),
  note: text("note"),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  exceptReason: text("except_reason"),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  }).$onUpdate(() => new Date()),
}, t=>[
  uniqueIndex().on(t.date, t.habitId)
]);

export const habitCheckmarksRelations = relations(
  habitCheckmark,
  ({ one }) => ({
    habit: one(habit, {
      fields: [habitCheckmark.habitId],
      references: [habit.id],
    }),
  })
);
