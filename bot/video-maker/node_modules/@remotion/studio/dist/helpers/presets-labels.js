"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelx264Preset = void 0;
const labelx264Preset = (profile) => {
    if (profile === 'ultrafast') {
        return 'ultrafast';
    }
    if (profile === 'superfast') {
        return 'superfast';
    }
    if (profile === 'veryfast') {
        return 'veryfast';
    }
    if (profile === 'faster') {
        return 'faster';
    }
    if (profile === 'fast') {
        return 'fast';
    }
    if (profile === 'medium') {
        return 'medium';
    }
    if (profile === 'slow') {
        return 'slow';
    }
    if (profile === 'slower') {
        return 'slower';
    }
    if (profile === 'veryslow') {
        return 'veryslow';
    }
    if (profile === 'placebo') {
        return 'placebo';
    }
    throw new TypeError(`Unknown x264 preset: ${profile}`);
};
exports.labelx264Preset = labelx264Preset;
