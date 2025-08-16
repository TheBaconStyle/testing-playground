import { AdminOptions } from "better-auth/plugins";
import { ac, user, admin } from "./roles";
import { Role } from "better-auth/plugins/access";

export const adminConfig: AdminOptions & {
  roles: Record<string, Role>;
} = {
  ac,
  roles: {
    user,
    admin,
  },
  defaultRole: "user",
};
