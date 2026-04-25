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
	import Island from '$lib/Island.svelte';

	import wmtypes_floating from '$lib/assets/wmtypes_floating.svg';
	import wmtypes_tiling from '$lib/assets/wmtypes_tiling.svg';
	import wmtypes_scrollable from '$lib/assets/wmtypes_scrollable.svg';

	// the pause button manages the video's playing/paused state, including accessibility and pausing it when it scrolls out of view. yes, it's a little bit cursed.
	import PauseButton from '$lib/PauseButton.svelte';

	import { browser } from '$app/environment';
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
			<h2>And it's fast, stable, and usable beyond belief.</h2>
			<a id="startbtn" class="button skeuo" href="#start">Start using it</a>
			<div id="controls">
				<button id="fullscreen" class="button">
					View demo
					<OpenInFull width={32} height={32} />
				</button>
				<PauseButton />
			</div>

			<script>
				// TODO: move into a dedicated component to get the logic out of this file, migrate to using svelte stores now that we have CSR enabled.
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
	<section id="whyniri">
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
	<section id="tiling">
		<h1>niri's unique model</h1>
		<div>
			<figure>
				<h2>What niri Does</h2>

				<img src={wmtypes_scrollable} id="wmtypes_scrollable_img" alt="" aria-hidden="true" />

				<p>
					<b>niri brings a new approach to organizing your windows.</b>
					It doesn't let windows cover other windows, or resize anything, without you telling it to. If
					you run out of space on your screen, just scroll to the side and open a new window!
				</p>
			</figure>
			<figure>
				<h2>The Status Quo</h2>
				<img src={wmtypes_floating} id="wmtypes_floating_img" alt="" aria-hidden="true" />

				<p>
					<b> Most modern computers let you place windows wherever you want on your screen. </b> The downside
					of this approach is that if you run out of room you need to shrink and reposition windows yourself,
					and windows can get buried under massive stacks of other windows.
				</p>
			</figure>
			<figure>
				<h2>The Other Alternative</h2>

				<img src={wmtypes_tiling} id="wmtypes_tiling_img" alt="" aria-hidden="true" />

				<p>
					<b>
						If you've spent a lot of time on Linux, you may have heard of tiling window managers.
					</b>

					Like niri, these don't let your windows overlap, but unlike niri they will shrink and
					squish your windows to fit into a grid. You can't have multiple fullscreen windows open in
					one workspace.
				</p>
			</figure>
		</div>
	</section>
	<section id="start">
		<h1>Start using niri</h1>
		<div>
			<figure>
				<h2>Install an OS that includes niri</h2>
				<p>
					For technical people looking to be on the bleeding edge of the Linux ecosystem, Zirconium
					is a great choice, and it comes with niri and <a href="https://danklinux.com/"
						>DankMaterialShell</a
					> out of the box.
				</p>
				<a href="https://zirconium.gay/" class="button">Get Zirconium</a>
				<p>
					If you want the best gaming performance possible, CachyOS' niri variant is also an amazing
					choice. You'll find it in the list of available desktop environments in the installer. It
					comes with <a href="https://noctalia.dev/">Noctalia</a>!
				</p>
				<a href="https://cachyos.org/" class="button">Get CachyOS</a>
			</figure>
			<figure>
				<h2>Install niri with a desktop</h2>

				<p>
					For those wanting a fully set-up niri experience, a large ecosystem of plugins and
					utilities, and a Material You-styled desktop, DankMaterialShell provides a great option.
				</p>
				<a href="https://danklinux.com/" class="button">Get DankMaterialShell</a>
				<p>
					If you prefer a minimalistic, comfy aesthetic and having total control over the appearance
					of your desktop while keeping the convenience of a shell, consider Noctalia.
				</p>
				<a href="https://noctalia.dev/" class="button">Get Noctalia</a>
			</figure>
			<figure>
				<h2>Configure niri yourself</h2>

				<p>
					Want total control over every aspect of your desktop? Our wiki covers everything you need
					to know about installing and using niri.
				</p>
				<a href="/niri" class="button">Read the Wiki</a>
			</figure>
			<figure>
				<h2>Contribute to niri</h2>

				<p>
					If you find yourself loving niri and have some spare time, there's always a way you can
					help out. Come help review issues, PRs and patches, or write the features you want to see
					into the project.
				</p>
				<a href="https://github.com/niri-wm/niri/" class="button">Go to GitHub</a>
			</figure>
		</div>
	</section>
	<section>
		<p id="credit">
			web design by <a href="https://github.com/bluelinden">blue linden</a>; niri logo by blue and
			<a href="https://github.com/HumpityDumpityDumber/">knee</a>
		</p>
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

	a#startbtn {
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
				object-fit: cover;
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

		#controls {
			bottom: var(--space-lg);
			right: var(--space-lg);
			display: flex;
			flex-direction: row;
			gap: var(--space-md);
			position: absolute;

			#fullscreen {
				background: var(--color-orange-300);
				color: var(--color-orange-900);
				&:hover {
					background: var(--color-orange-200);
				}
			}
		}
	}

	section > h1 {
		font-size: var(--text-2xl);
	}

	main > section {
		margin-bottom: var(--space-xl);
	}

	section#whyniri {
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

	section#tiling {
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
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: var(--space-md);
				p {
					text-align: left;
					padding-left: var(--space-md);
					padding-right: var(--space-md);
					width: 100%;
					font-size: var(--text-md);
				}
				img {
					border-radius: 24px;
					border-width: 4px;
					border-style: solid;
					&#wmtypes_floating_img {
						border-color: var(--color-blue-500);
					}
					&#wmtypes_tiling_img {
						border-color: var(--color-orange-500);
					}
					&#wmtypes_scrollable_img {
						border-color: var(--color-pink-500);
					}
				}
				h2 {
					line-height: var(--text-xl);
					margin-bottom: var(--space-md);
					margin-top: var(--space-lg);
				}
			}
		}
	}

	section#start {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		> div {
			display: grid;
			max-width: min(var(--screen-md), 100vw);
			grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
			gap: var(--space-md);
			padding: var(--space-lg);
			figure {
				display: flex;
				flex-direction: column;
				align-items: center;
				background-color: var(--color-background-container);
				padding: var(--space-md);
				border-radius: 24px;
				gap: var(--space-md);
				p {
					text-align: left;
					padding-left: var(--space-md);
					padding-right: var(--space-md);
					width: 100%;
					font-size: var(--text-md);
				}
				a.button {
					background-color: var(--color-pink-300);
					color: var(--color-pink-900);
					padding: var(--space-sm);
					padding-left: var(--space-lg);
					padding-right: var(--space-lg);
					margin-bottom: var(--space-md);
				}
				a:not(.button) {
					color: var(--color-link);
				}
				h2 {
					line-height: var(--text-xl);
					margin-bottom: var(--space-md);
				}
			}
		}
	}

	#credit {
		font-size: var(--text-xs);
		margin-bottom: var(--spacing-md);
		color: var(--color-text);
		a {
			color: var(--color-link);
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
