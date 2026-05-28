"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBundleMapUrlFromServeUrl = exports.getBundleUrlFromServeUrl = void 0;
const path_1 = __importDefault(require("path"));
const no_react_1 = require("remotion/no-react");
const is_serve_url_1 = require("./is-serve-url");
const map = (webpackBundleOrServeUrl, suffix) => {
    if ((0, is_serve_url_1.isServeUrl)(webpackBundleOrServeUrl)) {
        const parsed = new URL(webpackBundleOrServeUrl);
        const idx = parsed.pathname.lastIndexOf('/');
        if (idx === -1) {
            return parsed.origin + '/' + suffix;
        }
        return parsed.origin + parsed.pathname.substring(0, idx + 1) + suffix;
    }
    const index = webpackBundleOrServeUrl.lastIndexOf(path_1.default.sep);
    const url = webpackBundleOrServeUrl.substring(0, index + 1) + suffix;
    return url;
};
const getBundleUrlFromServeUrl = (serveUrl) => {
    return map(serveUrl, no_react_1.NoReactInternals.bundleName);
};
exports.getBundleUrlFromServeUrl = getBundleUrlFromServeUrl;
const getBundleMapUrlFromServeUrl = (serveUrl) => {
    return map(serveUrl, no_react_1.NoReactInternals.bundleMapName);
};
exports.getBundleMapUrlFromServeUrl = getBundleMapUrlFromServeUrl;
