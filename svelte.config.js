import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess({ script: true })],
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({ strict: true, assets: 'build', pages: 'build', fallback: undefined, precompress: false }),
    prerender: {
      entries: ['*'],
      crawl: false
    },



  },
  compilerOptions: {
    experimental: {
      async: true,
    },
  },
};

export default config;
