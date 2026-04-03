<script lang="ts">
	import { page } from '$app/state';
</script>

<p>ERROR!</p>
<h1>{page.status}: {page.error?.message}</h1>