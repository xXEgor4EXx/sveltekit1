<!-- <script>
    let number = $state();

    async function roll() {
        const response = await fetch('/');
        number = await response.json();
    }
</script>

<button onclick={roll}>Крути!!!</button>

<p>{JSON.stringify(number)}</p>

{#if number !== undefined}
    <p>Ты получил {number.value}</p>
{/if}

<p>home</p> -->

<script lang='ts'>
    import {page} from '$app/state'
    import type { PageProps } from './$types';

import type {RollType} from './roll/+server'

    const { data }: PageProps = $props()
    //curl http://localhost:5173/roll

    let number = $state<RollType>();
    let text = $state<RollType>();

    async function roll() {
		const response = await fetch('/roll');
		number = await response.json()// as RollType;
	}
    
    // import Accord from '$lib/components/accordaysi.svelte'
  </script>

<h1>Welcome to SvelteKit</h1>

<p>
    <button onclick={roll}>Случайное число {number? number.val: '-'}</button>
</p>

