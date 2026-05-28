"use strict";
// Adapted from node-fft project by Joshua Wong and Ben Bryan
// https://github.com/vail-systems/node-fft
Object.defineProperty(exports, "__esModule", { value: true });
exports.fftMag = void 0;
const complex_1 = require("./complex");
const fftMag = function (fftBins) {
    const ret = fftBins.map((f) => (0, complex_1.complexMagnitude)(f));
    return ret.slice(0, ret.length / 2);
};
exports.fftMag = fftMag;
