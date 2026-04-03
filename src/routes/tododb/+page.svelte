<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	let editingId = $state(null);

	// Упрощенный handle для Svelte 5
	function handleSubmit() {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				editingId = null;
			}
			await update();
		};
	}
</script>

<div class="mx-auto max-w-xs p-4">
	<h1 class="text-2xl font-bold mb-4 text-center">todo list</h1>
	
	<form method="POST" action="?/create" use:enhance>
		<label class="block mb-4">
			<span class="text-sm font-medium text-gray-700">Добавить задачу:</span>
			<input
				class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				name="description"
				placeholder="Что нужно сделать?"
				autocomplete="off"
				required
			/>
		</label>
	</form>

	<div class="todos">
		<!-- Важно: меняем data.todos на data.tododb -->
		{#each data.tododb as todo (todo.id)}
			{#if editingId === todo.id}
				<div class="border rounded p-2 my-2 bg-gray-50">
					<form method="POST" action="?/update" use:enhance={handleSubmit}>
						<input type="hidden" name="id" value={todo.id} />
						<input
							class="block w-full rounded-md border border-gray-300 p-2 text-sm"
							name="description"
							value={todo.description}
							autocomplete="off"
							autoFocus
						/>
						<div class="flex gap-2 mt-2">
							<button type="submit" class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Save</button>
							<button type="button" onclick={() => (editingId = null)} class="bg-gray-500 text-white px-3 py-1 rounded text-sm">Cancel</button>
						</div>
					</form>
				</div>
			{:else}
				<div class="flex items-center justify-between border rounded p-2 my-2 hover:shadow-sm transition-shadow">
					<div class="flex items-center gap-2 overflow-hidden">
						<form method="POST" action="?/toggle" use:enhance>
							<input type="hidden" name="id" value={todo.id} />
							<input type="hidden" name="isdone" value={todo.isdone} /> 
							
							<button 
								type="submit" 
								class="w-6 h-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors
									{todo.isdone 
										? 'bg-green-500 border-green-500 text-white' 
										: 'border-gray-300 hover:border-green-500'
									}"
								aria-label="Toggle done"
							>
								{#if todo.isdone}
									<span class="text-xs font-bold">✓</span>
								{/if}
							</button>
						</form>
						
						<span 
							class="truncate {todo.isdone 
								? 'text-gray-400 line-through' 
								: 'text-gray-800'
							}"
						>
							{todo.description}
						</span>
					</div>

					<div class="flex gap-2 ml-2">
						{#if !todo.isdone}
							<button 
								type="button" 
								onclick={() => (editingId = todo.id)}
								class="text-blue-600 hover:text-blue-800 text-sm font-medium"
							>
								Edit
							</button>
						{/if}
						
						<form method="POST" action="?/delete" use:enhance>
							<input type="hidden" name="id" value={todo.id} />
							<button type="submit" class="text-red-500 hover:text-red-700 font-bold px-1">×</button>
						</form>
					</div>
				</div>
			{/if}
		{:else}
			<p class="text-center text-gray-400 mt-4">Задач пока нет</p>
		{/each}
	</div>
</div>
