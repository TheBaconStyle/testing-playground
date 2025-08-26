import { Statements } from 'better-auth/plugins/access';
import { defaultStatements } from 'better-auth/plugins/admin/access';

export const statements = {
  ...defaultStatements,
  habit: ['create', 'update', 'delete', 'view', 'share', 'check_in'],
  streak: ['create', 'update', 'delete', 'view', 'share'],
  category: ['create', 'update', 'delete', 'view'],
  reminder: ['create', 'update', 'delete', 'view'],
} satisfies Statements;
