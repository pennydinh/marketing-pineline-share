"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSelectedPixelFormatAndCodecCombination = exports.validPixelFormatsForCodec = exports.DEFAULT_PIXEL_FORMAT = exports.validPixelFormats = void 0;
exports.validPixelFormats = [
    'yuv420p',
    'yuva420p',
    'yuv422p',
    'yuv444p',
    'yuv420p10le',
    'yuv422p10le',
    'yuv444p10le',
    'yuva444p10le',
];
exports.DEFAULT_PIXEL_FORMAT = 'yuv420p';
const validPixelFormatsForCodec = (codec) => {
    if (codec === 'vp8' || codec === 'vp9') {
        return exports.validPixelFormats;
    }
    return exports.validPixelFormats.filter((format) => format !== 'yuva420p');
};
exports.validPixelFormatsForCodec = validPixelFormatsForCodec;
const validateSelectedPixelFormatAndCodecCombination = (pixelFormat, codec) => {
    if (typeof pixelFormat === 'undefined') {
        return pixelFormat;
    }
    if (!exports.validPixelFormats.includes(pixelFormat)) {
        throw new TypeError(`Value ${pixelFormat} is not valid as a pixel format.`);
    }
    if (pixelFormat !== 'yuva420p') {
        return;
    }
    const validFormats = (0, exports.validPixelFormatsForCodec)(codec);
    if (!validFormats.includes(pixelFormat)) {
        throw new TypeError(`Pixel format was set to 'yuva420p' but codec ${codec} does not support it. Valid pixel formats for codec ${codec} are: ${validFormats.join(', ')}.`);
    }
};
exports.validateSelectedPixelFormatAndCodecCombination = validateSelectedPixelFormatAndCodecCombination;
