import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import path from 'path'; // Import path for resolving aliases
import nodePolyfills from 'rollup-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [wasm(),   nodePolyfills(), commonjs()],
  root: '.', // Points to the directory where `index.html` is located
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Ignore specific Node.js modules
      external: ['os', 'net', 'dgram', 'child_process', 'fs', 'http', 'https', 'path', 'crypto', 'stream', 'assert', 'util', 'module', 'timers', 'constant','SIGNALS'],
    },
    // other options...
  },
  server: {
    host: true, // Listen on all network interfaces
    port: 1420, // Specify the port
    // other server options...
  },
  resolve: {
    alias: {
  
    },
  },
});
//  // Alias 'node:os' to the shim file
      // ... other aliases