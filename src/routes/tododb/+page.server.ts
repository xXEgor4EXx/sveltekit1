import * as db from '$lib/server/tododata/js.js'
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load = (async ({ cookies }) => {
    let id = cookies.get('userid');
    if (!id) {
        id = crypto.randomUUID();
        cookies.set('userid', id, { path: '/' });
    }

    return { todos: db.getTodos(id) };
}) satisfies PageServerLoad;

export const actions = {
    create: async ({ cookies, request }) => {
        const data = await request.formData();
        try {
            db.createTodo(cookies.get('userid'), data.get('description'));
        } catch (error) {
            return fail(422, {
                description: data.get('description'),
                error: error.message
            });
        }
    },

    delete: async ({ cookies, request }) => {
        const data = await request.formData();
        db.deleteTodo(cookies.get('userid'), data.get('id'));
    },
    
    update: async({ cookies, request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const description = data.get('description');
        
        try {
            db.updateTodo(cookies.get('userid'), id, description);
            return { success: true };
        } catch (error) {
            return fail(422, {
                id: id,
                description: description,
                error: error.message
            });
        }
    },
    
    toggle: async({ cookies, request }) => {
        const data = await request.formData();
        const id = data.get('id');
        
        try {
            db.toggleTodo(cookies.get('userid'), id);
            return { success: true };
        } catch (error) {
            return fail(422, {
                id: id,
                error: error.message
            });
        }
    }
};