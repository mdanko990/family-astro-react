import type { InferSelectModel } from 'drizzle-orm';
import { persons, stories } from './schema.ts';

export type Person = InferSelectModel<typeof persons>;

export type Story = InferSelectModel<typeof stories>;
