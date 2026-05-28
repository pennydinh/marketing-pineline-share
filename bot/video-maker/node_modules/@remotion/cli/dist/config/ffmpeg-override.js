"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFfmpegOverrideFunction = exports.setFfmpegOverrideFunction = void 0;
let ffmpegOverrideFn = ({ args }) => args;
const setFfmpegOverrideFunction = (fn) => {
    ffmpegOverrideFn = fn;
};
exports.setFfmpegOverrideFunction = setFfmpegOverrideFunction;
const getFfmpegOverrideFunction = () => {
    return ffmpegOverrideFn;
};
exports.getFfmpegOverrideFunction = getFfmpegOverrideFunction;
