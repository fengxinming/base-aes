import { defineConfig } from 'vite';
import typescript from '@rollup/plugin-typescript';
import external from 'vite-plugin-external';
import { globbySync } from 'globby';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: globbySync('src/*.ts'),
      formats: ['es', 'cjs'],
      fileName: '[name]'
    }
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.build.json'
    }),
    external({
      nodeBuiltins: true,
      externalizeDeps: Object.keys(pkg.dependencies)
    })
  ],
  test: {
    name: 'log-base',
    dir: './test',
    environment: 'node'
  }
});
