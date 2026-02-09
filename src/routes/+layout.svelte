<script>
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/style.css';
	import "@fontsource/national-park";
	import "@fontsource/national-park/800.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
