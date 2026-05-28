"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackCaching = exports.setWebpackCaching = exports.DEFAULT_WEBPACK_CACHE_ENABLED = void 0;
exports.DEFAULT_WEBPACK_CACHE_ENABLED = true;
let webpackCaching = exports.DEFAULT_WEBPACK_CACHE_ENABLED;
const setWebpackCaching = (flag) => {
    if (typeof flag !== 'boolean') {
        throw new TypeError('Caching flag must be a boolean.');
    }
    webpackCaching = flag;
};
exports.setWebpackCaching = setWebpackCaching;
const getWebpackCaching = () => {
    return webpackCaching;
};
exports.getWebpackCaching = getWebpackCaching;
