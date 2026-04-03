import { boolean } from 'better-auth';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// import { relations } from 'drizzle-orm';

export const user = sqliteTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	age: integer('age'),
	sex: text('sex').$defaultFn(() => "M"),
	phonenumber: text('phonenumber')
});

export const tododb = sqliteTable('todo', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	description: text('description'),
	isdone: integer('isdone', {mode: 'boolean'})
}

)
// export const users = sqliteTable('users', {
//     id: integer('id').primaryKey({ autoIncrement: true }),
//     name: text('name').notNull(),
//     email: text('email').unique().notNull(),
//     createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
// });

