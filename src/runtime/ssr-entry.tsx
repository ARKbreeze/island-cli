import { App } from './App';
import { renderToString } from 'react-dom/server';

// 导出server端
export function render() {
  return renderToString(<App />);
}
