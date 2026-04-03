<script lang='ts'>
    import type { PageProps } from './$types';
    import type {RollType} from './roll/+server'

    const { data }: PageProps = $props()
    let number = $state<RollType>();
    async function roll() {
		const response = await fetch('/roll');
		number = await response.json()
	}
    let users = $derived(data.users);
  </script>

<h1>Welcome to SvelteKit</h1>
{JSON.stringify(data.users)}

{#each users as user}
    <p>{user.name}</p>
{/each}


<p>
    <button onclick={roll}>Случайное число {number? number.val: '-'}</button>
</p>
