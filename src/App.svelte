<script>
	import { onMount } from 'svelte';
	import { createScene } from "./scene";

	let el;
	
	onMount(() => {
		createScene(el)
	});
</script>

<main>
	<canvas bind:this={el}></canvas>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}


	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>