import { createServer as createViteDevServer } from 'vite';
import { pluginIndexHtml } from './plugin-island/indexHtml';
import react from '@vitejs/plugin-react';

export async function createServer(root: string = process.cwd()) {
  return createViteDevServer({
    root,
    plugins: [pluginIndexHtml(), react()],
  });
}
