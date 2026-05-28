"use strict";
// Adapted from node-fft project by Joshua Wong and Ben Bryan
// https://github.com/vail-systems/node-fft
Object.defineProperty(exports, "__esModule", { value: true });
exports.fftAccurate = void 0;
const complex_1 = require("./complex");
const exponent_1 = require("./exponent");
const fftAccurate = function (vector) {
    const X = [];
    const N = vector.length;
    // Base case is X = x + 0i since our input is assumed to be real only.
    if (N === 1) {
        if (Array.isArray(vector[0])) {
            // If input vector contains complex numbers
            return [[vector[0][0], vector[0][1]]];
        }
        return [[vector[0], 0]];
    }
    // Recurse: all even samples
    const X_evens = (0, exports.fftAccurate)(vector.filter((_, ix) => ix % 2 === 0));
    // Recurse: all odd samples
    const X_odds = (0, exports.fftAccurate)(vector.filter((__, ix) => ix % 2 === 1));
    // Now, perform N/2 operations!
    for (let k = 0; k < N / 2; k++) {
        // t is a complex number!
        const t = X_evens[k];
        const e = (0, complex_1.complexMultiply)((0, exponent_1.exponent)(k, N), X_odds[k]);
        X[k] = (0, complex_1.complexAdd)(t, e);
        X[k + N / 2] = (0, complex_1.complexSubtract)(t, e);
    }
    return X;
};
exports.fftAccurate = fftAccurate;
