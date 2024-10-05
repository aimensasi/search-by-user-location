import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

console.log("DB_HOST", process.env.DB_HOST);
export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? '3306'),
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? 'rootpassword',
    database: process.env.DB_NAME ?? 'myapp',
  },
});
