// 入口文件
import { createRoot } from 'react-dom/client';

import { App } from './App';

function renderInBrowser() {
  const containEle = document.querySelector('#root');
  if (!containEle) {
    throw new Error('no root ele');
  }
  createRoot(containEle).render(<App />);
}

renderInBrowser();
