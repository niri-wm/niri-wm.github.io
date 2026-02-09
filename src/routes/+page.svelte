<script>
	import Logo from '$lib/logo.svelte';
</script>

<main>
	<header>
		<menu>
			<ul>
				<li id="logo"><Logo color="var(--color-text)" /></li>
				<li><a href="/niri">Docs</a></li>
				<li><a href="https://github.com/niri-wm/niri/">Source code</a></li>
			</ul>
		</menu>
		<div class="colorful">
			<h1>Niri lets you scroll through your windows.</h1>
			<a id="video">Watch showcase</a>
		</div>
	</header>
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
		padding: 4rem;
		padding-top: 2rem;
	}

	a#video {
		background: var(--color-blue-900);
		color: var(--color-pink-100);
		font-family: 'National Park', sans-serif;
		padding: 1rem 2rem;
		border: none;
		font-size: 2rem;
		font-weight: 800;
		border-radius: 999px;
	}

	menu {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		padding-left: 4rem;
		margin-bottom: 2rem;
		padding-right: 4rem;
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
			font-size: 1.5rem;
			a {
				color: var(--color-pink-900);
				@color-scheme dark {
					color: var(--color-pink-100);
					text-decoration-color: var(--color-pink-100);
				}
				text-decoration-thickness: 3px;
				text-underline-offset: 6px;
				text-decoration-inset: 2px;
			}
		}
	}

	.colorful {
		background: linear-gradient(90deg, var(--color-pink-700), var(--color-orange-700));
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
		justify-content: center;
		border-radius: 32px;
		h1 {
			font-size: 3rem;
			font-family: 'National Park', sans-serif;
			color: var(--color-pink-100);
			font-weight: 800;
		}
	}

	#logo {
		margin-right: auto;

		:global(svg) {
			width: auto;
			height: 48px;
		}
	}
</style>
