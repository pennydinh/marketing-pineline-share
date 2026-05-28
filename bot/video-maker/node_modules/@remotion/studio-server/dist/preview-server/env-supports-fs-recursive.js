"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSupportsFsRecursive = void 0;
const envSupportsFsRecursive = () => {
    const nodeVersion = process.version.replace('v', '').split('.');
    if (process.platform === 'darwin' || process.platform === 'win32') {
        return true;
    }
    if (parseInt(nodeVersion[0], 10) > 19) {
        return true;
    }
    if (parseInt(nodeVersion[0], 10) === 19 &&
        parseInt(nodeVersion[1], 10) >= 1) {
        return true;
    }
    return false;
};
exports.envSupportsFsRecursive = envSupportsFsRecursive;
