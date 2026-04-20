<script>
	import Logo from '$lib/logo.svelte';
	import gradient from '$lib/assets/nirigradients.svg';
</script>

<main>
	<header>
		<menu>
			<ul>
				<li id="logo"><Logo color="var(--color-text)" /></li>
				<li><a href="/niri">Docs</a></li>
				<li><a href="https://github.com/niri-wm/niri/">Code</a></li>
			</ul>
		</menu>
		<div class="colorful">
			<video
				src="https://github.com/niri-wm/niri/assets/1794388/bce834b0-f205-434e-a027-b373495f9729"
				muted
				autoplay
				loop
				playsinline
				id="herovid"
			></video>
			<img src={gradient} id="herograd" alt="" aria-hidden="true" />
			<script>
				document.addEventListener('DOMContentLoaded', () => {
					// set the video's playback speed to 2x
					const video = document.getElementById('herovid');
					video.playbackRate = 1.5;
				});
			</script>
			<h1>Niri lets you scroll through your windows.</h1>
			<h2>And it's fast, stable and usable beyond belief.</h2>
			<a id="start" class="button skeuo">Start using it</a>
		</div>
	</header>
	<section id="tiling">
		<h1>How scrollable tiling works</h1>
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		width: 100vw;
		text-align: center;
		box-sizing: border-box;
		scroll-snap-type: y mandatory;
	}

	header {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--space-lg);
		padding-top: var(--space-md);
	}

	a#start {
		background: var(--color-blue-800);
		color: var(--color-blue-200);
	}

	menu {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		padding-left: var(--space-xl);
		margin-bottom: var(--space-md);
		padding-right: var(--space-xl);
		box-sizing: border-box;
		top: 0;
		left: 0;
	}

	ul {
		display: flex;
		gap: 2rem;
		align-items: center;
		width: 100%;
		li {
			list-style: none;
			font-family: 'National Park', sans-serif;
			font-weight: 800;
			font-size: var(--text-md-nd);
			a {
				color: var(--color-text);
				text-decoration-thickness: 2.5px;
				text-underline-offset: 4px;
				text-decoration-inset: 2px;
			}
		}
	}

	.colorful {
		/*background: linear-gradient(90deg, var(--color-pink-700), var(--color-orange-700));*/
		background: var(--color-pink-800);
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
		justify-content: center;
		border-radius: 32px;
		overflow: hidden;
		position: relative;
		h1 {
			font-size: var(--text-2xl);
			font-family: 'National Park', sans-serif;
			color: var(--color-pink-100);
			font-weight: 800;
			z-index: 1;
			margin-bottom: calc(var(--space-lg) * -1);
		}
		h2 {
			font-size: var(--text-xl);
			font-family: 'National Park', sans-serif;
			color: var(--color-pink-300);
			font-weight: 800;
			z-index: 1;
		}
		h1,
		h2,
		a {
			margin-left: var(--space-md);
			margin-right: var(--space-md);
		}

		#herovid {
			position: absolute;
			height: 100%;
			width: 100%;
			transform: scale(101%);
			z-index: 0;
			object-fit: cover;
			filter: brightness(30%) saturate(150%) blur(4px);
		}
		#herograd {
			position: absolute;
			height: 100%;
			width: 100%;
			z-index: 0;
			mix-blend-mode: overlay;
			object-fit: cover;
		}
	}

	section > h1 {
		font-size: var(--text-2xl);
	}
	
	section#tiling {
	  /* css grid blocks layout */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}

	#logo {
		margin-right: auto;

		:global(svg) {
			width: auto;
			height: 48px;
		}
	}
</style>
