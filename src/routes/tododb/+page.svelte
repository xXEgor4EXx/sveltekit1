<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	let editingId = $state(null);

	function handleSubmit() {
		return async ({ result }) => {
			console.log(result);
			if (result.type === 'success') {
				editingId = null;
			}
		};
	}
</script>

<div class="mx-auto max-w-xs">
	<h1 class="text-2xl font-bold">todos</h1>
	<form method="POST" action="?/create" use:enhance>
		<label class="text-sm font-medium text-gray-700">
			Добавить todo:
			<input
				class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				name="description"
				autocomplete="off"
			/>
		</label>
	</form>
	<div class="todos">
		{#each data.todos as todo (todo.id)}
			{#if editingId === todo.id}
				<div class="border rounded p-2 my-2">
					<form method="POST" action="?/update" use:enhance={handleSubmit}>
						<input type="hidden" name="id" value={todo.id} />
						<input
							class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							name="description"
							value={todo.description}
							autocomplete="off"
						/>
						<div class="flex gap-2 mt-2">
							<button type="submit" class="bg-green-500 text-white px-3 py-1 rounded">Save</button>
							<button type="button" onclick={() => (editingId = null)} class="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
						</div>
					</form>
				</div>
			{:else}
				<div class="flex items-center justify-between border rounded p-2 my-2">
					<div class="flex items-center gap-2">
						<form method="POST" action="?/toggle" class="inline">
							<input type="hidden" name="id" value={todo.id} />
							<button 
								type="submit" 
								class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
									{todo.done 
										? 'bg-green-500 border-green-500 text-white' 
										: 'border-gray-400 hover:border-green-500'
									}"
								aria-label="Toggle done"
							>
								{#if todo.done}
									<span class="text-xs">✓</span>
								{/if}
							</button>
						</form>
						<span 
							class="{todo.done 
								? 'text-gray-400 line-through' 
								: 'text-amber-800 tracking-wider font-semibold'
							}"
						>
							{todo.description}
						</span>
					</div>
					<div class="flex gap-1">
						<button 
							type="button" 
							onclick={() => (editingId = todo.id)}
							class="bg-blue-500 text-white px-3 py-1 rounded text-sm"
							disabled={todo.done}
						>
							Edit
						</button>
						<form method="POST" action="?/delete" class="inline">
							<input type="hidden" name="id" value={todo.id} />
							<button type="submit" class="bg-red-500 text-white px-3 py-1 rounded text-sm">X</button>
						</form>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>