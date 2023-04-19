"use strict";
// build逻辑
// 适用vite进行打包
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.renderPage = exports.bundle = void 0;
var plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
var vite_1 = require("vite");
var constants_1 = require("./constants");
var console_1 = require("console");
var path_1 = require("path");
var fs = __importStar(require("fs-extra"));
function bundle(root) {
    if (root === void 0) { root = process.cwd(); }
    return __awaiter(this, void 0, void 0, function () {
        var resolveViteConfig, _a, clientBundle, serverBundle, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    resolveViteConfig = function (isServer) {
                        return {
                            mode: 'production',
                            root: root,
                            plugins: [(0, plugin_react_1.default)()],
                            build: {
                                ssr: isServer,
                                assetsDir: isServer ? '' : 'asset',
                                outDir: isServer ? '.temp' : 'build',
                                rollupOptions: {
                                    input: isServer ? constants_1.SERVER_ENTRY_PATH : constants_1.CLIENT_ENTRY_PATH,
                                    output: isServer ? { format: 'cjs', entryFileNames: '[name].js' } : { format: 'esm' },
                                },
                            },
                        };
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    // await viteBuild(clientBuild);
                    // await viteBuild(serverBuild);
                    (0, console_1.log)('bundle job', root);
                    return [4 /*yield*/, Promise.all([
                            // 1. 打包client
                            (0, vite_1.build)(resolveViteConfig(false)),
                            // 2. 打包server
                            (0, vite_1.build)(resolveViteConfig(true)),
                        ])];
                case 2:
                    _a = _b.sent(), clientBundle = _a[0], serverBundle = _a[1];
                    return [2 /*return*/, [clientBundle, serverBundle]];
                case 3:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.bundle = bundle;
// 渲染页面
// 组装server 跟 client
// 读取字符串 渲染 server
// script 添加 client端script
function renderPage(render, root, clientBundle) {
    return __awaiter(this, void 0, void 0, function () {
        var clientChunk, appHtml, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientChunk = clientBundle.output.find(function (chunk) { return chunk.type === 'chunk' && chunk.isEntry; });
                    appHtml = render();
                    html = "<!DOCTYPE html>\n  <html>\n    <head>\n      <meta charset=\"utf-8\">\n      <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n      <title>title</title>\n      <meta name=\"description\" content=\"xxx\">\n    </head>\n    <body>\n      <div id=\"root\">".concat(appHtml, "</div>\n      <script type=\"module\" src=\"/").concat(clientChunk === null || clientChunk === void 0 ? void 0 : clientChunk.fileName, "\"></script>\n    </body>\n  </html>\n  ").trim();
                    //写入html
                    return [4 /*yield*/, fs.ensureDir((0, path_1.join)(root, 'build'))];
                case 1:
                    //写入html
                    _a.sent();
                    return [4 /*yield*/, fs.writeFile((0, path_1.join)(root, 'build', 'index.html'), html)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fs.remove((0, path_1.join)(root, '.temp'))];
                case 3:
                    _a.sent();
                    console.log('complete');
                    return [2 /*return*/];
            }
        });
    });
}
exports.renderPage = renderPage;
function build(root) {
    if (root === void 0) { root = process.cwd(); }
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            bundle(root).then(function (value) { return __awaiter(_this, void 0, void 0, function () {
                var clientBundle, serverBundle, render;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!value) return [3 /*break*/, 2];
                            clientBundle = value[0], serverBundle = value[1];
                            render = require((0, path_1.join)(root, '.temp', 'ssr-entry.js')).render;
                            return [4 /*yield*/, renderPage(render, root, clientBundle)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.build = build;
