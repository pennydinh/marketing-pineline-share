"use strict";
// Adapted from node-fft project by Joshua Wong and Ben Bryan
// https://github.com/vail-systems/node-fft
Object.defineProperty(exports, "__esModule", { value: true });
exports.exponent = void 0;
const mapExponent = {};
const exponent = function (k, N) {
    const x = -2 * Math.PI * (k / N);
    mapExponent[N] = mapExponent[N] || {};
    mapExponent[N][k] = mapExponent[N][k] || [Math.cos(x), Math.sin(x)]; // [Real, Imaginary]
    return mapExponent[N][k];
};
exports.exponent = exponent;
