import {json} from '@sveltejs/kit';
import * as db from '$lib/server/tododata/js';

export async function POST({request, cookies}) {
    const {description} = await request.json();
    const userid = cookies.get('userid');

    const newTodo = db.createTodo(userid, description);
    return json({id: newTodo.id}, {status: 201});
}