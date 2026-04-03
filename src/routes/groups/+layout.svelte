<script lang="ts">
	import { page } from '$app/stores';	
	interface Props {
		data: {
			groupsList: Array<{ name: string; count: number; link: string }>;
			stats: { totalGroups: number; totalStudents: number };
		};
		children?: any;
	}
	let { data, children }: Props = $props();
	let currentPath = $derived(decodeURIComponent($page.url.pathname));
	let isGroupsActive = $derived(
		currentPath === '/groups' || currentPath.startsWith('/groups/')
	);
	function isActiveGroup(link: string): boolean {
		const decodedLink = decodeURIComponent(link);
		return currentPath === decodedLink || currentPath === decodedLink + '/';
	}
</script>

<div class="flex min-h-screen bg-gray-900 text-white">
	<aside class="w-80 bg-gray-800 border-r border-gray-700 p-6 overflow-y-auto">
		<div class="mb-6">
			<a 
				href="/groups" 
				class="block px-4 py-3 rounded-lg transition-all duration-200 font-medium
					{isGroupsActive
						? 'bg-blue-600 text-white shadow-lg' 
						: 'bg-gray-700 text-gray-200 hover:bg-gray-600'
					}"
			>
				🏠 Все группы
			</a>
		</div>
		
		<h2 class="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3">
			Список групп ({data.stats.totalGroups})
		</h2>
		
		<div class="space-y-2">
			{#each data.groupsList as group}
				<a 
					href={group.link}
					class="flex justify-between items-center px-4 py-3 rounded-lg transition-all duration-200
						{isActiveGroup(group.link)
							? 'bg-blue-600 text-white shadow-md scale-[1.02]' 
							: 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
						}"
				>
					<span class="font-medium">{group.name}</span>
					<span class="text-sm bg-gray-900 px-2 py-1 rounded-full text-gray-300">
						{group.count}
					</span>
				</a>
			{/each}
		</div>
		
		<div class="mt-8 pt-6 border-t border-gray-700">
			<div class="bg-gray-900/50 rounded-lg p-4">
				<p class="text-sm text-gray-400">Всего студентов:</p>
				<p class="text-2xl font-bold text-blue-400">{data.stats.totalStudents}</p>
			</div>
		</div>
	</aside>
	
	<main class="flex-1 p-8 overflow-y-auto bg-gray-900">
		{@render children()}
	</main>
</div>