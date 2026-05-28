"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPreferredVideoImageFormat = exports.getUserPreferredStillImageFormat = exports.setVideoImageFormat = exports.setStillImageFormat = void 0;
const renderer_1 = require("@remotion/renderer");
const truthy_1 = require("../truthy");
let currentStillImageFormat;
let currentVideoImageFormat;
const setStillImageFormat = (format) => {
    if (typeof format === 'undefined') {
        currentStillImageFormat = undefined;
        return;
    }
    if (!renderer_1.RenderInternals.validStillImageFormats.includes(format)) {
        throw new TypeError([
            `Value ${format} is not valid as an image format.`,
            // @ts-expect-error
            format === 'jpg' ? 'Did you mean "jpeg"?' : null,
        ]
            .filter(truthy_1.truthy)
            .join(' '));
    }
    currentStillImageFormat = format;
};
exports.setStillImageFormat = setStillImageFormat;
const setVideoImageFormat = (format) => {
    if (typeof format === 'undefined') {
        currentVideoImageFormat = undefined;
        return;
    }
    if (!renderer_1.RenderInternals.validVideoImageFormats.includes(format)) {
        throw new TypeError([
            `Value ${format} is not valid as a video image format.`,
            // @ts-expect-error
            format === 'jpg' ? 'Did you mean "jpeg"?' : null,
        ]
            .filter(truthy_1.truthy)
            .join(' '));
    }
    currentVideoImageFormat = format;
};
exports.setVideoImageFormat = setVideoImageFormat;
const getUserPreferredStillImageFormat = () => {
    return currentStillImageFormat;
};
exports.getUserPreferredStillImageFormat = getUserPreferredStillImageFormat;
const getUserPreferredVideoImageFormat = () => {
    return currentVideoImageFormat;
};
exports.getUserPreferredVideoImageFormat = getUserPreferredVideoImageFormat;
