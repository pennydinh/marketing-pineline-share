"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFfmpegOverride = void 0;
const validateFfmpegOverride = (ffmpegArgsHook) => {
    if (typeof ffmpegArgsHook === 'undefined') {
        return;
    }
    if (ffmpegArgsHook && typeof ffmpegArgsHook !== 'function') {
        throw new TypeError(`Argument passed for "ffmpegArgsHook" is not a function: ${ffmpegArgsHook}`);
    }
};
exports.validateFfmpegOverride = validateFfmpegOverride;
