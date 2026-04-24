<script>
	import Logo from '$lib/logo.svelte';
	import gradient from '$lib/assets/nirigradients.svg';
	import SplitscreenLandscapeAdd from 'virtual:icons/material-symbols/splitscreen-landscape-add-outline-rounded';
	import Speed from 'virtual:icons/material-symbols/speed-outline-rounded';
	import Style from 'virtual:icons/material-symbols/style-outline';
	import TrackpadInput from 'virtual:icons/material-symbols/trackpad-input-outline-rounded';
	import Exercise from 'virtual:icons/material-symbols/exercise-outline';
	import Check from 'virtual:icons/material-symbols/check-rounded';
	import OpenInFull from 'virtual:icons/material-symbols/open-in-full-rounded';
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
				class="blurred"
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
			<h1>niri lets you scroll through your windows.</h1>
			<h2>And it's fast, stable and usable beyond belief.</h2>
			<a id="start" class="button skeuo">Start using it</a>
			<button id="fullscreen" class="button">
				View demo
				<OpenInFull width={32} height={32} />
			</button>
			<script>
				document.getElementById('fullscreen').addEventListener('click', () => {
					const video = document.getElementById('herovid');
					if (video.requestFullscreen) {
						video.requestFullscreen();
						video.controls = true;
						video.classList.remove('blurred');
					} else if (video.webkitRequestFullscreen) {
						/* Safari */
						video.webkitRequestFullscreen();
						video.controls = true;
						video.classList.remove('blurred');
					} else if (video.msRequestFullscreen) {
						/* IE11 */
						video.msRequestFullscreen();
						video.controls = true;
						video.classList.remove('blurred');
					}
				});
				// restore video on close
				document.addEventListener('fullscreenchange', () => {
					const video = document.getElementById('herovid');
					if (!document.fullscreenElement) {
						video.controls = false;
						video.classList.add('blurred');
					}
				});
			</script>
		</div>
	</header>
	<section id="tiling">
		<h1>Why niri?</h1>
		<div>
			<figure>
				<SplitscreenLandscapeAdd width={48} height={48} />

				<h2>Your windows don't fight for space.</h2>
				<p>
					You can give each window as much space as it needs on your screen. Instead of stacking or
					shrinking windows, niri moves them to the sides, off your screen until you need them.
				</p>
			</figure>
			<figure>
				<Speed width={48} height={48} />

				<h2>You can put it on anything.</h2>
				<p>
					From a 2007 Eee PC to a modern gaming rig with high-performance graphics, niri supports a
					lot. If it has video acceleration, it can probably run niri at 60 FPS.
				</p>
			</figure>
			<figure>
				<Style width={48} height={48} />

				<h2>Looks how you like.</h2>
				<p>
					It supports fun eye candy like background blur and custom animations, as well as regular
					customization options like borders, shadows and transparency.
				</p>
			</figure>
			<figure>
				<TrackpadInput width={48} height={48} />

				<h2>You have controls.</h2>
				<p>
					niri supports trackpads, touchscreens, mice, trackballs, trackpoints, and drawing tablets,
					and you can tweak how you use any of them without digging through dozens of config files.
				</p>
			</figure>
			<figure>
				<Exercise width={48} height={48} />

				<h2>It won't brick.</h2>
				<p>
					You can depend on niri to update cleanly without breaking changes or crashes, so you can
					focus on getting your work done. We will not break your config.
				</p>
			</figure>
			<figure>
				<Check width={48} height={48} />

				<h2>niri just works.</h2>
				<p>
					It comes with trackpad gestures, a screenshot UI, an overview for your windows, screen
					reader support, and alt-tab built right in. You can change all the settings in the niri
					config file.
				</p>
			</figure>
		</div>
	</section>
	<section id="users">

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
		background: var(--color-blue-700);
		color: var(--color-blue-100);

		&:hover {
			background: var(--color-blue-600);
		}
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
		background: #000;
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

			z-index: 0;

			&.blurred {
				filter: brightness(30%) saturate(150%) blur(4px);
				transform: scale(101%);
			}
		}
		#herograd {
			position: absolute;
			height: 100%;
			width: 100%;
			z-index: 0;
			mix-blend-mode: overlay;
			object-fit: cover;
		}

		#fullscreen {
			bottom: var(--space-lg);
			right: var(--space-lg);
			background: var(--color-orange-300);
			color: var(--color-orange-900);
			&:hover {
				background: var(--color-orange-200);
			}
			position: absolute;
		}
	}

	section > h1 {
		font-size: var(--text-2xl);
	}

	section#tiling {
		/* css grid blocks layout */
		display: flex;
		flex-direction: column;
		gap: var(--space-md);

		> div {
			display: grid;
			max-width: min(var(--screen-md), 100vw);
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
			gap: var(--space-md);
			padding: var(--space-lg);
			figure {
				background-color: var(--color-background-container);
				padding: var(--space-lg);
				border-radius: 24px;
				display: flex;
				flex-direction: column;
				align-items: center;
				h2 {
					line-height: var(--text-xl);
					margin-bottom: var(--space-md);
				}
			}
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
