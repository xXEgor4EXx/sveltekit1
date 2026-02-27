let date = new Date();
const db = new Map();

export function getTodos(userid) {
	if (!db.get(userid)) {
		db.set(userid, [{
			id: crypto.randomUUID(),
			description: 'Learn SvelteKit',
			data: date.setHours(0),
			done: false
		}]);
	}
	let result = db.get(userid)
	console.log("Данные:", result)
	return db.get(userid);
}

export function createTodo(userid, description) {
	if (description === '') {
		throw new Error('todo must have a description');
	}

	const todos = db.get(userid);

	if (todos.find((todo) => todo.description === description)) {
		throw new Error('todos must be unique');
	}

	todos.push({
		id: crypto.randomUUID(),
		description,
		done: false
	});
}

export function deleteTodo(userid, todoid) {
	const todos = db.get(userid);
	const index = todos.findIndex((todo) => todo.id === todoid);

	if (index !== -1) {
		todos.splice(index, 1);
	}
}

export function updateTodo(userid, todoid, newDescription) {
    if (newDescription === '') {
        throw new Error('description cannot be empty');
    }
    const todos = db.get(userid);
    if (!todos) {
        throw new Error('user not found');
    }
    const updatedTodos = todos.map(t => 
        t.id === todoid ? { ...t, description: newDescription } : t
    );
    db.set(userid, updatedTodos);
}

export function toggleTodo(userid, todoid) {
    const todos = db.get(userid);
    
    if (!todos) {
        throw new Error('user not found');
    }
    const updatedTodos = todos.map(todo => 
        todo.id === todoid ? { ...todo, done: !todo.done } : todo
    );
    
    db.set(userid, updatedTodos);
}