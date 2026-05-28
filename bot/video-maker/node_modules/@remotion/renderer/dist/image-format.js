"use strict";
// Keeping the default image format PNG if you don't pass a
// value to the renderer for backwards compatibility.
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStillImageFormat = exports.validateSelectedPixelFormatAndImageFormatCombination = exports.DEFAULT_STILL_IMAGE_FORMAT = exports.DEFAULT_VIDEO_IMAGE_FORMAT = exports.validStillImageFormats = exports.validVideoImageFormats = void 0;
exports.validVideoImageFormats = ['png', 'jpeg', 'none'];
exports.validStillImageFormats = ['png', 'jpeg', 'pdf', 'webp'];
exports.DEFAULT_VIDEO_IMAGE_FORMAT = 'jpeg';
exports.DEFAULT_STILL_IMAGE_FORMAT = 'png';
// By returning a value, we improve testability as we can specifically test certain branches
const validateSelectedPixelFormatAndImageFormatCombination = (pixelFormat, videoImageFormat) => {
    if (videoImageFormat === 'none') {
        return 'none';
    }
    if (typeof pixelFormat === 'undefined') {
        return 'valid';
    }
    if (!exports.validVideoImageFormats.includes(videoImageFormat)) {
        throw new TypeError(`Value ${videoImageFormat} is not valid as an image format.`);
    }
    if (pixelFormat !== 'yuva420p' && pixelFormat !== 'yuva444p10le') {
        return 'valid';
    }
    if (videoImageFormat !== 'png') {
        throw new TypeError(`Pixel format was set to '${pixelFormat}' but the image format is not PNG. To render transparent videos, you need to set PNG as the image format.`);
    }
    return 'valid';
};
exports.validateSelectedPixelFormatAndImageFormatCombination = validateSelectedPixelFormatAndImageFormatCombination;
const validateStillImageFormat = (imageFormat) => {
    if (!exports.validStillImageFormats.includes(imageFormat)) {
        throw new TypeError(String(`Image format should be one of: ${exports.validStillImageFormats
            .map((v) => `"${v}"`)
            .join(', ')}`));
    }
};
exports.validateStillImageFormat = validateStillImageFormat;
