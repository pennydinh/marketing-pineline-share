"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpack = exports.bundle = exports.BundlerInternals = void 0;
const bundle_1 = require("./bundle");
const index_html_1 = require("./index-html");
const read_recursively_1 = require("./read-recursively");
const webpack_cache_1 = require("./webpack-cache");
const webpack_config_1 = require("./webpack-config");
const esbuild = require("esbuild");
const webpack = require("webpack");
exports.webpack = webpack;
exports.BundlerInternals = {
    esbuild,
    webpackConfig: webpack_config_1.webpackConfig,
    indexHtml: index_html_1.indexHtml,
    cacheExists: webpack_cache_1.cacheExists,
    clearCache: webpack_cache_1.clearCache,
    getConfig: bundle_1.getConfig,
    readRecursively: read_recursively_1.readRecursively,
    findClosestFolderWithItem: bundle_1.findClosestFolderWithItem,
    internalBundle: bundle_1.internalBundle,
};
var bundle_2 = require("./bundle");
Object.defineProperty(exports, "bundle", { enumerable: true, get: function () { return bundle_2.bundle; } });
