import { sveltekit } from '@sveltejs/kit/vite';
import { islandsPlugin } from 'sveltekit-islands/plugin';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit(), islandsPlugin(), Icons({
    compiler: 'svelte',
  })],
  resolve: {
    alias: [
      // {
      //   find: /^\$icons$/,
      //   replacement: '/node_modules/@ajwdmedia/svelterial-symbols/Rounded'
      // }
    ]
  },
  css: {

  }
});
