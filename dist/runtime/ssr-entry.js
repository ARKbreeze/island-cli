"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var App_1 = require("./App");
var server_1 = require("react-dom/server");
// 导出server端
function render() {
    return (0, server_1.renderToString)((0, jsx_runtime_1.jsx)(App_1.App, {}));
}
exports.render = render;
