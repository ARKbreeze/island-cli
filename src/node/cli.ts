import { cac } from 'cac';
import { log } from 'console';
import { createServer } from './dev';
import path from 'path';

// 版本信息

const version = require('../../package.json').version;

// 初始化cli
// 初始化版本信息 应该是通用的   注册返回   并且自带帮助
const cli = cac('island').version(version).help();

//注册dev命令
cli
  .command('[root]', '启动开发服务')
  .alias('dev')
  .action(async (root: string) => {
    // root 处理
    root = root ? path.resolve(root) : process.cwd();
    const server = await createServer(root);
    await server.listen();
    server.printUrls();
  });

//注册build命令
cli.command('build [root]', '启动打包服务').action(async (root: string) => {
  log('build start on', root);
});

//命令解析
cli.parse();
