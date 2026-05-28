"use strict";
// Adapted from node-fft project by Joshua Wong and Ben Bryan
// https://github.com/vail-systems/node-fft
Object.defineProperty(exports, "__esModule", { value: true });
exports.complexMagnitude = exports.complexMultiply = exports.complexSubtract = exports.complexAdd = void 0;
const complexAdd = function (a, b) {
    return [a[0] + b[0], a[1] + b[1]];
};
exports.complexAdd = complexAdd;
const complexSubtract = function (a, b) {
    return [a[0] - b[0], a[1] - b[1]];
};
exports.complexSubtract = complexSubtract;
const complexMultiply = function (a, b) {
    return [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
};
exports.complexMultiply = complexMultiply;
const complexMagnitude = function (c) {
    return Math.sqrt(c[0] * c[0] + c[1] * c[1]);
};
exports.complexMagnitude = complexMagnitude;
