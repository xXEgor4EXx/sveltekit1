import type {PageServerLoad} from './$types';
import {db} from '$lib/server/db';
import * as schema from '$lib/server/db/schema';

export const load = (async () => {
    try{
        const users = await db.select().from(schema.user);
        return{
            users: users
        };
    }
    catch(error)
    {
        console.error('Ошибочкаааа', error);
        return{
            users: []
        };
    }
}) satisfies PageServerLoad;