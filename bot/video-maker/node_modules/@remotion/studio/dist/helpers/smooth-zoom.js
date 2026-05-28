"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsmoothenZoom = exports.smoothenZoom = exports.MAX_ZOOM = exports.MIN_ZOOM = void 0;
const BASE = Math.E / 4;
exports.MIN_ZOOM = 0.05;
exports.MAX_ZOOM = 10;
function logN(val) {
    return Math.log(val) / Math.log(BASE);
}
const smoothenZoom = (input) => {
    return BASE ** (input - 1);
};
exports.smoothenZoom = smoothenZoom;
const unsmoothenZoom = (input) => {
    if (input < 0) {
        return exports.MAX_ZOOM;
    }
    return Math.min(exports.MAX_ZOOM, Math.max(exports.MIN_ZOOM, logN(input) + 1));
};
exports.unsmoothenZoom = unsmoothenZoom;
