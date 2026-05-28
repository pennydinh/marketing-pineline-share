"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrowserExecutable = exports.setBrowserExecutable = void 0;
let currentBrowserExecutablePath = null;
const setBrowserExecutable = (newBrowserExecutablePath) => {
    currentBrowserExecutablePath = newBrowserExecutablePath;
};
exports.setBrowserExecutable = setBrowserExecutable;
const getBrowserExecutable = () => {
    return currentBrowserExecutablePath;
};
exports.getBrowserExecutable = getBrowserExecutable;
