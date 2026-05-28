"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularProgress = exports.RENDER_STATUS_INDICATOR_SIZE = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const colors_1 = require("../../helpers/colors");
exports.RENDER_STATUS_INDICATOR_SIZE = 16;
const STROKE_WIDTH = 3;
const container = {
    height: exports.RENDER_STATUS_INDICATOR_SIZE,
    width: exports.RENDER_STATUS_INDICATOR_SIZE,
    transform: `rotate(-90deg)`,
};
const CircularProgress = ({ progress }) => {
    const r = exports.RENDER_STATUS_INDICATOR_SIZE / 2 - STROKE_WIDTH;
    const circumference = r * Math.PI * 2;
    return ((0, jsx_runtime_1.jsx)("svg", { style: container, viewBox: `0 0 ${exports.RENDER_STATUS_INDICATOR_SIZE} ${exports.RENDER_STATUS_INDICATOR_SIZE}`, children: (0, jsx_runtime_1.jsx)("circle", { r: exports.RENDER_STATUS_INDICATOR_SIZE / 2 - STROKE_WIDTH, stroke: colors_1.LIGHT_TEXT, fill: "none", strokeWidth: STROKE_WIDTH, cx: exports.RENDER_STATUS_INDICATOR_SIZE / 2, cy: exports.RENDER_STATUS_INDICATOR_SIZE / 2, strokeDasharray: `${circumference} ${circumference}`, strokeMiterlimit: 0, strokeDashoffset: (1 - progress) * circumference }) }));
};
exports.CircularProgress = CircularProgress;
