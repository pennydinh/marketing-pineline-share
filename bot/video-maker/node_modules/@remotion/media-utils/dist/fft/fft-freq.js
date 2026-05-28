"use strict";
// Adapted from node-fft project by Joshua Wong and Ben Bryan
// https://github.com/vail-systems/node-fft
Object.defineProperty(exports, "__esModule", { value: true });
exports.fftFreq = void 0;
const fftFreq = function (fftBins, sampleRate) {
    const stepFreq = sampleRate / fftBins.length;
    const ret = fftBins.slice(0, fftBins.length / 2);
    return ret.map((__, ix) => {
        return ix * stepFreq;
    });
};
exports.fftFreq = fftFreq;
