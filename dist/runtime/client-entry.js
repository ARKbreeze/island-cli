"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
// 入口文件
var client_1 = require("react-dom/client");
var App_1 = require("./App");
function renderInBrowser() {
    var containEle = document.querySelector('#root');
    if (!containEle) {
        throw new Error('no root ele');
    }
    (0, client_1.createRoot)(containEle).render((0, jsx_runtime_1.jsx)(App_1.App, {}));
}
renderInBrowser();
