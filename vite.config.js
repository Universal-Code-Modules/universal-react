import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

import fs from 'fs';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    host: true,
    https: {
      key: fs.readFileSync('./.cert/key.pem'),
      cert: fs.readFileSync('./.cert/cert.pem'),
    }
  },
})
