<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Pause from 'virtual:icons/material-symbols/pause-rounded';
	import Play from 'virtual:icons/material-symbols/play-arrow-rounded';

	let video: HTMLVideoElement;

	function toggleVideo() {
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	}

	// variable for whether the video is paused
	// we need this because the video element doesn't have a way to listen for pause/play events
	let isPaused = $state(false);

	await tick();

	// listen for pause/play events on the video element
	onMount(() => {
		video = document.getElementById('herovid') as HTMLVideoElement;

		video.addEventListener('pause', () => {
			isPaused = true;
		});
		video.addEventListener('play', () => {
			isPaused = false;
		});

		// check if user prefers reduced motion and pause the video if they do
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			video.pause();
		}
	});
</script>

<button aria-label="Pause video" onclick={toggleVideo} class="button">
	{#if isPaused}
		<Play width={32} height={32} />
	{:else}
		<Pause width={32} height={32} />
	{/if}
</button>

<style>
	.button {
		background: var(--color-);
		background: var(--color-orange-300);
		color: var(--color-orange-900);
		&:hover {
			background: var(--color-orange-200);
		}
	}
</style>
