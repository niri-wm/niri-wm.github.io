<script>
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/style.css';
	import '@fontsource/national-park';
	import '@fontsource/national-park/800.css';

	let { children } = $props();

	import { dev } from '$app/environment';

	// we can't import directly because when CSR is disabled it won't run on the client
	const devImport = `<script type="module" src="/node_modules/@11ty/is-land/is-land.js"></sc${'ript>'}`;
	// use the bundled version when not dev
	const builtImport = `<script type="module" src="/__islands/is-land.js"></sc${'ript>'}`;
	const islandPath = dev ? devImport : builtImport;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@html islandPath}

{@render children()}
