<script lang='ts'>
    import MyButton from '$lib/components/BtnComp.svelte';
    import MyDialog from '$lib/components/DiaComp.svelte'
    import type { PageProps } from './$types';
    import type {RollType} from './roll/+server'

    const { data }: PageProps = $props()
    let number = $state<RollType>();
    async function roll() {
		const response = await fetch('/roll');
		number = await response.json()
	}
    let users = $derived(data.users);

    let open = $state(false);
  </script>

<h1>Welcome to SvelteKit</h1>
{JSON.stringify(data.users)}

{#each users as user}
    <p>{user.name}</p>
{/each}


<MyButton onclick={()=> (open =! open)}/>
{open}
<MyDialog/>
<p>
    <button onclick={roll}>Случайное число {number? number.val: '-'}</button>
</p>
