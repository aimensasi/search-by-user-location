import { createId } from '@paralleldrive/cuid2';
import { mysqlTable, varchar, serial } from 'drizzle-orm/mysql-core';

export const users: any = mysqlTable('users', {
  id: varchar('id', { length: 128 }).$defaultFn(() => `usr_${createId()}`),
  username: varchar('username', { length: 50 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
});


