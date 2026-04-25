import { svelte } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';
import { join } from 'path';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';



// TODO: could this be a Vite plugin?
export default defineConfig(async () => {
  // TODO: improve logic, e.g. nested folders, Test.2.svelte
  const islandsFolder = join(__dirname, 'src/lib/islands');
  const islands = fs.readdirSync(islandsFolder);
  const input = islands.reduce((acc, fileName) => {
    const key = fileName.split('.')[0];
    acc[key] = join(islandsFolder, fileName);
    return acc;
  }, {});

  input['is-land'] = join(__dirname, 'node_modules/@11ty/is-land/is-land.js');

  return {
    // logLevel: 'debug',
    build: {
      // minify: 'terser',
      minify: false,
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
          toplevel: true,      // shorten top-level names — big win in lib mode
        },
        format: {
          comments: false,     // strip all comments
        },
      },
      lib: {
        entry: Object.values(input),
        formats: ['es']
      },
      rollupOptions: {
        // in Vite 3.2, potentially multiple entries instead
        // https://github.com/vitejs/vite/pull/7047
        // input,
        output: {
          dir: 'static/__islands',
          entryFileNames: '[name].js', // TODO: hash filenames?
          manualChunks: {
            svelte: ["svelte", "svelte/internal"],
          },
        },
        // external(id) {
        //   const isExternal = id === 'svelte' || id.startsWith('svelte/')
        //   if (isExternal) console.log('externalizing:', id)
        //   return isExternal
        // },

      },
    },
    // TODO: can we hook into SvelteKit somehow?
    plugins: [
      svelte({
        configFile: './islands.svelte.config.js',
      }),
      Icons({
        compiler: "raw",
      })
    ]
  };
});
