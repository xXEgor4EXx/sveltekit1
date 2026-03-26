<script>
    let {data} = $props();
</script>

<p>{JSON.stringify(data)}</p>

<div class="center">
    <h1>TODOS</h1>
    <label>
        add todo:
        <input 
            class="todo-input"
            type="text"
            autocomplete="off"
            onkeydown={async (e) => {
                if (e.key !== 'Enter') return;

                const input = e.currentTarget;
                const description = input.value;
                const response = await fetch('/todoapi', {
                    method: 'POST',
                    body: JSON.stringify({ description }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const { id } = await response.json();

                const todos = [
                    ...data.todos,
                    {
                        id,
                        description
                    }
                ];

                data = { ...data, todos };
                
                input.value = '';
            }}
        />
    </label>
    
    <ul class="todos">
        {#each data.todos as todo (todo.id)}
            <li>
                <label class="todo-item">
                    <input
                        type="checkbox"
                        checked={todo.done}
                        onchange={async (e) => {
                            const done = e.currentTarget.checked;
                            
                            await fetch(`/todoapi/${todo.id}`, {
                                method: 'PUT',
                                body: JSON.stringify({ done }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                        }}
                    />
                    <span class={todo.done ? 'completed' : ''}>{todo.description}</span>
                    <button
                        class="delete-btn"
                        aria-label="Delete todo"
                        onclick={async () => {
                            await fetch(`/todoapi/${todo.id}`, {
                                method: 'DELETE'
                            });
                            
                            const todos = data.todos.filter(t => t.id !== todo.id);
                            data = { ...data, todos };
                        }}
                    ></button>
                </label>
            </li>
        {/each}
    </ul>
</div>

<style>
    .center {
        max-width: 30em;
        margin: 0 auto;
        padding: 2rem 1rem;
        font-family: system-ui, -apple-system, sans-serif;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
        color: #1f2937;
        text-align: center;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-weight: 500;
        color: #374151;
        margin-bottom: 1.5rem;
    }

    .todo-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        font-size: 1rem;
        transition: all 0.2s;
        box-sizing: border-box;
    }

    .todo-input:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .todos {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .todo-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        background: #f9fafb;
        border-radius: 0.5rem;
        transition: background 0.2s;
        margin-bottom: 0;
    }

    .todo-item:hover {
        background: #f3f4f6;
    }

    .todo-item input[type="checkbox"] {
        width: 1.2rem;
        height: 1.2rem;
        cursor: pointer;
        margin: 0;
    }

    .todo-item span {
        flex: 1;
        font-size: 1rem;
        color: #1f2937;
        transition: all 0.2s;
    }

    .todo-item span.completed {
        text-decoration: line-through;
        color: #9ca3af;
    }

    .delete-btn {
        border: none;
        background: url(./remove.svg) no-repeat center;
        background-size: 1rem 1rem;
        cursor: pointer;
        width: 1.75rem;
        height: 1.75rem;
        opacity: 0.4;
        transition: all 0.2s;
        border-radius: 0.375rem;
        flex-shrink: 0;
    }

    .delete-btn:hover {
        opacity: 1;
        background-color: #fee2e2;
        transform: scale(1.05);
    }

    .delete-btn:active {
        transform: scale(0.95);
    }
</style>