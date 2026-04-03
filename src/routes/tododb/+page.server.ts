import {db} from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';
import { eq, and } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';

export const load = (async () => {
    try{
        const tododb = await db.select().from(schema.tododb);
        return{
            tododb: tododb
        };
    }
    catch(error)
    {
        console.error('Ошибочкаааа', error);
        return{
            tododb: []
        };
    }
}) satisfies PageServerLoad;

export const actions = {
    create: async ({ cookies, request }) => {
        const data = await request.formData();
        const description = data.get('description') as string;
        
        try {
            await db.insert(schema.tododb).values({
                description: description,
                isdone: false
            });
        } catch (error: any) {
            return fail(422, {
                description,
                error: error.message
            });
        }
    },

    delete: async ({ cookies, request }) => {
        const data = await request.formData();
        const id = data.get('id') as string;

        await db.delete(schema.tododb)
            .where(eq(schema.tododb.id, id));
    },
    
    update: async({ cookies, request }) => {
        const data = await request.formData();
        const id = data.get('id') as string;
        const description = data.get('description') as string;
        
        try {
            await db.update(schema.tododb)
                .set({ description })
                .where(eq(schema.tododb.id, id));
            return { success: true };
        } catch (error: any) {
            return fail(422, { id, description, error: error.message });
        }
    },
    
    toggle: async({ cookies, request }) => {
        const data = await request.formData();
        const id = data.get('id') as string;
        
        try {
            const current = await db.select()
                .from(schema.tododb)
                .where(eq(schema.tododb.id, id))
                .get();

            if (current) {
                await db.update(schema.tododb)
                    .set({ isdone: !current.isdone })
                    .where(eq(schema.tododb.id, id));
            }
            
            return { success: true };
        } catch (error: any) {
            return fail(422, { id, error: error.message });
        }
    }
};