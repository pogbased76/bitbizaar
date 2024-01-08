 import { defineConfig } from 'vite';
 import wasm from 'vite-plugin-wasm';
 import nodePolyfills from 'rollup-plugin-node-polyfills';
 import commonjs from '@rollup/plugin-commonjs';
 import builtins from 'rollup-plugin-node-builtins';
 import { nodeResolve } from '@rollup/plugin-node-resolve';

  import process from 'process'
  
  export default defineConfig({
    plugins: [wasm(), builtins(),
      commonjs({
        include: ['node_modules/**'],
        namedExports: {
          'protobufjs/src/util/minimal.js': ['default'],  // add your module here
        },
        )
 //     }),],
    define: {
      'process': {},
      'global': {},
    },
    root: 'dist',
    build: {
      outDir: 'dist',
      rollupOptions: {
        external: [
          'os', 'net', 'dgram', 'child_process', 'fs', 'http', 'https', 'path',
          'crypto', 'stream', 'assert', 'util', 'module', 'timers', 'constant', 
          'SIGNALS', 'buffer'
        ],
      },
    }
  });


// import * as util from 'protobufjs/src/util/minimal.js';
// import protobuf from 'protobufjs/minimal.js';
// import process from 'process'
// export default defineConfig({
 // import { defineConfig } from 'vite'
  //import vue from '@vitejs/plugin-vue'


//   plugins: [
     
//     nodeResolve({
//       browser: true,
//       preferBuiltins: true,
//     }),
//     nodePolyfills(),
//     wasm(),
//   ],
//   define: {
//     'global.Buffer': 'Buffer',
//     'process': {},
//     'global': {},
//   },

  
//   server: {
//     host: true,
//     port: 80,
//   },
//   resolve: {
//     alias: {
//       'buffer': require.resolve('buffer/'),
//     },
//   },
//   provide: {
//     'util': util,
//   },
// });