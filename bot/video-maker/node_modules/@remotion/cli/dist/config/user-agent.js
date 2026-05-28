"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChromiumUserAgent = exports.setChromiumUserAgent = void 0;
let userAgent = null;
const setChromiumUserAgent = (newAgent) => {
    userAgent = newAgent;
};
exports.setChromiumUserAgent = setChromiumUserAgent;
const getChromiumUserAgent = () => {
    return userAgent;
};
exports.getChromiumUserAgent = getChromiumUserAgent;
