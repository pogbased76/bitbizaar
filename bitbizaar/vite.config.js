import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { Buffer } from 'buffer';

export default defineConfig({
  plugins: [
    builtins(),
    commonjs({
      include: ['node_modules/**'],
      exportDefault: {
        'protobufjs/src/util/minimal.js': 'util',
        'buffer': 'Buffer',
      },
    }),
    nodeResolve({
      browser: true,
      preferBuiltins: true,
    }),
    nodePolyfills(),
    wasm(),
  ],
  define: {
    'global.Buffer': 'Buffer',
  },
  root: 'dist',
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [
        'os', 'net', 'dgram', 'child_process', 'fs', 'http', 'https', 'path',
        'crypto', 'stream', 'assert', 'util', 'module', 'timers', 'constant', 'SIGNALS', 'buffer'
      ],
    },
  },
  server: {
    host: true,
    port: 80,
  },
  resolve: {
    alias: {
      'buffer': require.resolve('buffer/'),
    },
  },
});
