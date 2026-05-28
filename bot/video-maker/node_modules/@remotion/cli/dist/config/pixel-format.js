"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPixelFormat = exports.setPixelFormat = void 0;
const renderer_1 = require("@remotion/renderer");
let currentPixelFormat = renderer_1.RenderInternals.DEFAULT_PIXEL_FORMAT;
const setPixelFormat = (format) => {
    if (!renderer_1.RenderInternals.validPixelFormats.includes(format)) {
        throw new TypeError(`Value ${format} is not valid as a pixel format.`);
    }
    currentPixelFormat = format;
};
exports.setPixelFormat = setPixelFormat;
const getPixelFormat = () => {
    return currentPixelFormat;
};
exports.getPixelFormat = getPixelFormat;
