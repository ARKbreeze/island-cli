// htmlPlugin
import { readFile } from 'fs/promises';
import { IndexHtmlTransform, IndexHtmlTransformHook, IndexHtmlTransformResult, Plugin } from 'vite';
import { PACKAGE_ROOT, DEFAULT_HTML_PATH, CLIENT_ENTRY_PATH } from '../constants';

export function pluginIndexHtml(): Plugin {
  return {
    name: 'island:index-html',
    // 什么阶段执行的 serve  开发
    apply: 'serve',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@fs/${CLIENT_ENTRY_PATH}`,
            },
            injectTo: 'body',
          },
        ],
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // 现在这个html 必须经过vite先处理
          let html = await readFile(DEFAULT_HTML_PATH, 'utf-8');

          try {
            // 处理的返回值   这是个钩子
            html = await server.transformIndexHtml(req.url ? req.url : '', html, req.originalUrl);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
          } catch (e) {
            // 出错就把 错误传递下去
            return next(e);
          }
        });
      };
    },
  };
}
