import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess({ script: true })],
  compilerOptions: {
    css: 'injected',
    dev: false,
    experimental: {
      async: true,
    },
    
  },
};

export default config;
