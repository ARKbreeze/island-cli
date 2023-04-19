import { createServer as createViteDevServer } from 'vite';

export async function createServer(root: string = process.cwd()) {
  return createViteDevServer({
    root,
  });
}
