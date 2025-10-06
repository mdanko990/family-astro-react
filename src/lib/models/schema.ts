import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const persons = sqliteTable('persons', {
  id: integer('id').primaryKey(),
  firstname: text('firstname'),
  patronym: text('patronym'),
  lastname: text('lastname'),
  gender: text('gender', { enum: ['M', 'F'] }),
  birthId: integer('birth_id').notNull().references(() => stories.id),
  deathId: integer('death_id').notNull().references(() => stories.id),
  marriageId: integer('marriage_id').notNull().references(() => stories.id),
  isDraft: integer('is_draft', { mode: 'boolean' })
});

export const stories = sqliteTable("stories", {
  id: integer('id').primaryKey(),
  date: integer('date', { mode: 'timestamp' }),
  place: text('place'),
  type: text('type', { enum: ["BIRTH", "MARRIAGE", "DEATH"] }),
  personId: integer('person_id').notNull().references(() => persons.id),
  // create additional table with marriage infos
  // partnerId: integer('person_id').references(() => persons.id),
  // childrenIds: text('tags1', { mode: 'json' }).$type<string[]>().default(sql`(json_array())`)
})