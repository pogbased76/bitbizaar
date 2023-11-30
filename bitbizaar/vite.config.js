
import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins'; // Plugin for Node built-ins
import { Buffer } from 'buffer'; // Import Buffer

export default defineConfig({
  plugins: [
    builtins(), // Add the builtins plugin for Node built-ins
    commonjs({
      include: [
        'node_modules/debug/**',
        'node_modules/@libp2p/logger/**',
        'node_modules/node-forge/**',
        'node_modules/buffer/**',
        'node_modules/protobufjs/**', // Include protobufjs
        'node_modules/ipns/node_modules/protons-runtime/**', // Include protons-runtime
        // Add other specific modules here if needed
      ],
    }),
    nodePolyfills(), // Add nodePolyfills for Node polyfills
    wasm(), // Add wasm plugin for WebAssembly modules
  ],
  define: {
    'global.Buffer': Buffer, // Define Buffer globally
  },
  root: 'dist', // Set the root directory where 'index.html' is located
  build: {
    outDir: 'dist', // Specify the output directory for build files
    rollupOptions: {
      external: [
        'os', 'net', 'dgram', 'child_process', 'fs', 'http', 'https', 'path',
        'crypto', 'stream', 'assert', 'util', 'module', 'timers', 'constant', 'SIGNALS',
        // Add other Node-specific modules here if they are not intended for browser use
      ],
    },
  },
  server: {
    host: true, // Listen on all network interfaces
    port: 80, // Specify the server port
  },
  resolve: {
    alias: {
      'buffer': require.resolve('buffer/'), // Alias for 'buffer' module
    },
  },
});
