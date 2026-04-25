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
  minify: 'terser',
  terserOptions: {
    compress: {
      passes: 10,          // keep compressing until it stops shrinking
      toplevel: true,      // remove unused top-level vars/functions
      drop_console: true,
      drop_debugger: true,
      pure_getters: true,
      unsafe: true,        // some micro-optimizations, generally safe for components
      unsafe_comps: true,
      unsafe_math: true,
    },
    mangle: {
      toplevel: true,
    },
    format: {
      comments: false,     // strip all comments
    },
  },
  css: {

  }
});
