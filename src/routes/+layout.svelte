<script>
	import favicon from '$lib/assets/favicon.png';
	import webimage from '$lib/assets/webimage.png';
	import '$lib/style.css';
	import '@fontsource/national-park';
	import '@fontsource/national-park/800.css';

	let { children } = $props();

	import { dev } from '$app/environment';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>The niri Window Manager</title>
	<meta property="og:title" content="The niri window manager" />
	<meta property="og:url" content="https://niri-wm.github.io/" />
	<meta property="og:image" content={webimage} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1280" />
	<meta property="og:image:height" content="1024" />
	<meta
		property="og:description"
		content="A tiling window manager that lets you scroll through your windows."
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:src" content={webimage} />
	<meta
		name="twitter:description"
		content="A tiling window manager that lets you scroll through your windows."
	/>
	<meta name="twitter:title" content="The niri window manager" />
</svelte:head>

{@render children()}
