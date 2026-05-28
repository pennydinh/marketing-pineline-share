"use strict";
// Adapted from node-fft project by Joshua Wong and Ben Bryan
// https://github.com/vail-systems/node-fft
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxPossibleMagnitude = void 0;
const to_int_16_1 = require("./to-int-16");
const getMax = (array) => {
    let max = 0;
    for (let i = 0; i < array.length; i++) {
        const val = array[i];
        if (val > max) {
            max = val;
        }
    }
    return max;
};
const cache = {};
const getMaxPossibleMagnitude = (metadata) => {
    if (cache[metadata.resultId]) {
        return cache[metadata.resultId];
    }
    const result = (0, to_int_16_1.toInt16)(getMax(metadata.channelWaveforms[0]));
    cache[metadata.resultId] = result;
    return result;
};
exports.getMaxPossibleMagnitude = getMaxPossibleMagnitude;
