"use strict";
// https://superuser.com/questions/1607099/how-to-control-gif-loop-settings-in-ffmpeg
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertNumberOfGifLoopsToFfmpegSyntax = void 0;
const convertNumberOfGifLoopsToFfmpegSyntax = (loops) => {
    // Infinite loop
    if (loops === null) {
        return '0';
    }
    // No loops
    if (loops === 0) {
        return '-1';
    }
    // N amount of loops
    return String(loops);
};
exports.convertNumberOfGifLoopsToFfmpegSyntax = convertNumberOfGifLoopsToFfmpegSyntax;
