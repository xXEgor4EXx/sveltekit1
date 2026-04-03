import 'dotenv/config';

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
//import { env } from '$env/dynamic/private';

//if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

if(!process.env.DATABASE_URL) throw new Error('DB not set!');   

const client = createClient({ url: process.env.DATABASE_URL! });

export const db = drizzle(client, {schema});

async function main() {
  const user: typeof schema.user.$inferInsert = {
    name: 'Михаил',
    age: 21,
    sex: 'M',
    phonenumber: '79002121226'
  };
  
// await db.insert(schema.user).values(user);
// console.log('Пользователь создан!')
}