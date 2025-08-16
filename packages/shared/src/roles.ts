import { createAccessControl } from "better-auth/plugins/access";
import { statements } from "./statements";
import { adminAc } from "better-auth/plugins/admin/access";

export const ac = createAccessControl(statements);

export type HabbinsAC = typeof ac;

export const user = ac.newRole({
  habit: ["create", "update", "delete", "share", "view", "check_in"],
  streak: ["view", "share"],
  category: ["create", "update", "delete", "view"],
  reminder: ["create", "update", "delete", "view"],
});

export const admin = ac.newRole({
  ...adminAc.statements,
});
