import type { Config } from 'drizzle-kit';

export default {
    schema: './src/lib/models/schema.ts',
    out: './drizzle',
    dialect: "sqlite",
    dbCredentials: {
        url: process.env.NODE_ENV === 'production'
            ? '/data/db.sqlite3'
            : './db.sqlite3'
    }
} satisfies Config;