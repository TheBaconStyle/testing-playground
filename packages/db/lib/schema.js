"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatorsRelations = exports.authenticators = exports.verificationTokens = exports.sessionsRelations = exports.sessions = exports.accountsRelations = exports.accounts = exports.usersRelations = exports.users = exports.dbSchema = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.dbSchema = (0, pg_core_1.pgSchema)(process.env.DB_SCHEMA);
exports.users = exports.dbSchema.table("user", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.text)("name"),
    email: (0, pg_core_1.text)("email").unique(),
    emailVerified: (0, pg_core_1.timestamp)("emailVerified", { mode: "date" }),
    image: (0, pg_core_1.text)("image"),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    accounts: many(exports.accounts),
    verificationTokens: many(exports.verificationTokens),
    sessions: many(exports.sessions),
    authenticators: many(exports.authenticators),
}));
exports.accounts = exports.dbSchema.table("account", {
    userId: (0, pg_core_1.uuid)("userId")
        .notNull()
        .references(() => exports.users.id, { onDelete: "cascade" }),
    type: (0, pg_core_1.text)("type").$type().notNull(),
    provider: (0, pg_core_1.text)("provider").notNull(),
    providerAccountId: (0, pg_core_1.text)("providerAccountId").notNull(),
    refresh_token: (0, pg_core_1.text)("refresh_token"),
    access_token: (0, pg_core_1.text)("access_token"),
    expires_at: (0, pg_core_1.integer)("expires_at"),
    token_type: (0, pg_core_1.text)("token_type"),
    scope: (0, pg_core_1.text)("scope"),
    id_token: (0, pg_core_1.text)("id_token"),
    session_state: (0, pg_core_1.text)("session_state"),
}, (account) => [
    {
        compoundKey: (0, pg_core_1.primaryKey)({
            columns: [account.provider, account.providerAccountId],
        }),
    },
]);
exports.accountsRelations = (0, drizzle_orm_1.relations)(exports.accounts, ({ one }) => ({
    user: one(exports.users, { fields: [exports.accounts.userId], references: [exports.users.id] }),
}));
exports.sessions = exports.dbSchema.table("session", {
    sessionToken: (0, pg_core_1.text)("sessionToken").primaryKey(),
    userId: (0, pg_core_1.uuid)("userId")
        .notNull()
        .references(() => exports.users.id, { onDelete: "cascade" }),
    expires: (0, pg_core_1.timestamp)("expires", { mode: "date" }).notNull(),
});
exports.sessionsRelations = (0, drizzle_orm_1.relations)(exports.sessions, ({ one }) => ({
    user: one(exports.users, { fields: [exports.sessions.userId], references: [exports.users.id] }),
}));
exports.verificationTokens = exports.dbSchema.table("verificationToken", {
    identifier: (0, pg_core_1.text)("identifier").notNull(),
    token: (0, pg_core_1.text)("token").notNull(),
    expires: (0, pg_core_1.timestamp)("expires", { mode: "date" }).notNull(),
}, (verificationToken) => [
    {
        compositePk: (0, pg_core_1.primaryKey)({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    },
]);
exports.authenticators = exports.dbSchema.table("authenticator", {
    credentialID: (0, pg_core_1.text)("credentialID").notNull().unique(),
    userId: (0, pg_core_1.uuid)("userId")
        .notNull()
        .references(() => exports.users.id, { onDelete: "cascade" }),
    providerAccountId: (0, pg_core_1.text)("providerAccountId").notNull(),
    credentialPublicKey: (0, pg_core_1.text)("credentialPublicKey").notNull(),
    counter: (0, pg_core_1.integer)("counter").notNull(),
    credentialDeviceType: (0, pg_core_1.text)("credentialDeviceType").notNull(),
    credentialBackedUp: (0, pg_core_1.boolean)("credentialBackedUp").notNull(),
    transports: (0, pg_core_1.text)("transports"),
}, (authenticator) => [
    {
        compositePK: (0, pg_core_1.primaryKey)({
            columns: [authenticator.userId, authenticator.credentialID],
        }),
    },
]);
exports.authenticatorsRelations = (0, drizzle_orm_1.relations)(exports.authenticators, ({ one }) => ({
    user: one(exports.users, { fields: [exports.authenticators.userId], references: [exports.users.id] }),
}));
//# sourceMappingURL=schema.js.map