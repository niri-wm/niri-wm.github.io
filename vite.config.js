import { sveltekit } from '@sveltejs/kit/vite';
import { islandsPlugin } from 'sveltekit-islands/plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit(), islandsPlugin()],
  appType: 'mpa',
  css: {

  }
});
