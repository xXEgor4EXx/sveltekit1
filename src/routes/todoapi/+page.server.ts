import * as db from '$lib/server/tododata/js.js'
import type { PageServerLoad } from './$types';

export const load =  ({ cookies }) => {
    let userid = cookies.get('userid');
    if (!userid) {
        userid = crypto.randomUUID();
        cookies.set('userid', userid, { path: '/' });
    }

    return { userid:userid, todos: db.getTodos(userid) };
};