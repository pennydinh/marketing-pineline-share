"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackPolling = exports.setWebpackPollingInMilliseconds = void 0;
const DEFAULT_WEBPACK_POLL = null;
let webpackPolling = DEFAULT_WEBPACK_POLL;
const setWebpackPollingInMilliseconds = (interval) => {
    if (typeof interval !== 'number' && interval !== null) {
        throw new TypeError(`Polling must be a number or null, got ${JSON.stringify(interval)} instead.`);
    }
    webpackPolling = interval;
};
exports.setWebpackPollingInMilliseconds = setWebpackPollingInMilliseconds;
const getWebpackPolling = () => {
    return webpackPolling;
};
exports.getWebpackPolling = getWebpackPolling;
