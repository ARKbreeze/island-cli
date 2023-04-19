// build逻辑
// 适用vite进行打包

import reactPlugin from '@vitejs/plugin-react';
import { build as viteBuild, InlineConfig } from 'vite';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import { log } from 'console';
import { RollupOutput } from 'rollup';
import { join, resolve } from 'path';
import * as fs from 'fs-extra';

export async function bundle(root: string = process.cwd()) {
  const resolveViteConfig = (isServer: boolean): InlineConfig => {
    return {
      mode: 'production',
      root,
      plugins: [reactPlugin()],
      build: {
        ssr: isServer,
        assetsDir: isServer ? '' : 'asset',
        outDir: isServer ? '.temp' : 'build',
        rollupOptions: {
          input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
          output: isServer ? { format: 'cjs', entryFileNames: '[name].js' } : { format: 'esm' },
        },
      },
    };
  };

  try {
    // await viteBuild(clientBuild);
    // await viteBuild(serverBuild);
    log('bundle job', root);
    const [clientBundle, serverBundle] = await Promise.all([
      // 1. 打包client
      viteBuild(resolveViteConfig(false)),
      // 2. 打包server
      viteBuild(resolveViteConfig(true)),
    ]);
    return [clientBundle, serverBundle] as RollupOutput[];
  } catch (error) {
    console.log(error);
  }
}

// 渲染页面
// 组装server 跟 client
// 读取字符串 渲染 server
// script 添加 client端script
export async function renderPage(render: () => string, root: string, clientBundle: RollupOutput) {
  // 找到入口chunk
  const clientChunk = clientBundle.output.find((chunk) => chunk.type === 'chunk' && chunk.isEntry);

  // 拼接html
  // server
  const appHtml = render();

  const html = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>title</title>
      <meta name="description" content="xxx">
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script type="module" src="/${clientChunk?.fileName}"></script>
    </body>
  </html>
  `.trim();

  //写入html
  await fs.ensureDir(join(root, 'build'));
  await fs.writeFile(join(root, 'build', 'index.html'), html);
  await fs.remove(join(root, '.temp'));
  console.log('complete');
}

export async function build(root: string = process.cwd()) {
  bundle(root).then(async (value) => {
    if (value) {
      const [clientBundle, serverBundle] = value;
      const { render } = require(join(root, '.temp', 'ssr-entry.js'));
      await renderPage(render, root, clientBundle);
    }
  });
}
