import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import liveReload from 'vite-plugin-live-reload';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), liveReload('./*')],
});
