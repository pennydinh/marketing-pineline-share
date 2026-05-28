"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBitrate = void 0;
const validateBitrate = (bitrate, name) => {
    if (bitrate === null || typeof bitrate === 'undefined') {
        return;
    }
    if (typeof bitrate === 'number') {
        throw new TypeError(`"${name}" must be a string ending in "K" or "M". Got a number: ${bitrate}`);
    }
    if (typeof bitrate !== 'string') {
        throw new TypeError(`"${name}" must be a string or null, but got ${JSON.stringify(bitrate)}`);
    }
    if (!bitrate.endsWith('K') &&
        !bitrate.endsWith('k') &&
        !bitrate.endsWith('M')) {
        throw new TypeError(`"${name}" must end in "K", "k" or "M", but got ${JSON.stringify(bitrate)}`);
    }
};
exports.validateBitrate = validateBitrate;
