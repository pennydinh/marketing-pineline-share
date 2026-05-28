"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCenterPointWhileScrolling = exports.getEffectiveTranslation = void 0;
const getEffectiveXTranslation = ({ canvasSize, scale, compositionWidth, translation, }) => {
    const maxTranslation = Math.abs(canvasSize.width / 2 +
        (scale * compositionWidth) / 2 -
        MUST_BE_INSIDE_CANVAS);
    return Math.max(-maxTranslation, Math.min(translation.x, maxTranslation));
};
const MUST_BE_INSIDE_CANVAS = 50;
const getEffectiveYTranslation = ({ canvasSize, scale, compositionHeight, translation, }) => {
    const maxTranslation = Math.abs(canvasSize.height / 2 + (scale * compositionHeight) / 2) -
        MUST_BE_INSIDE_CANVAS;
    return Math.max(-maxTranslation, Math.min(translation.y, maxTranslation));
};
const getEffectiveTranslation = ({ canvasSize, scale, compositionHeight, compositionWidth, translation, }) => {
    return {
        x: getEffectiveXTranslation({
            canvasSize,
            compositionWidth,
            scale,
            translation,
        }),
        y: getEffectiveYTranslation({
            canvasSize,
            compositionHeight,
            scale,
            translation,
        }),
    };
};
exports.getEffectiveTranslation = getEffectiveTranslation;
const getCenterPointWhileScrolling = ({ size, clientX, clientY, compositionWidth, compositionHeight, scale, translation, }) => {
    const mouseLeft = clientX - size.left;
    const mouseTop = clientY - size.top;
    const contentLeftPoint = size.width / 2 - (compositionWidth * scale) / 2 - translation.x;
    const contentTopPoint = size.height / 2 - (compositionHeight * scale) / 2 - translation.y;
    const offsetFromVideoLeft = Math.min(compositionWidth, Math.max(0, (mouseLeft - contentLeftPoint) / scale));
    const offsetFromVideoTop = Math.min(compositionHeight, Math.max(0, (mouseTop - contentTopPoint) / scale));
    return {
        centerX: offsetFromVideoLeft,
        centerY: offsetFromVideoTop,
    };
};
exports.getCenterPointWhileScrolling = getCenterPointWhileScrolling;
