"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aspectRatio = void 0;
function gcd_two_numbers(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        const t = y;
        y = x % y;
        x = t;
    }
    return x;
}
const aspectRatio = (width, height) => {
    const commonDivisor = gcd_two_numbers(width, height);
    const widthDivisor = width / commonDivisor;
    const heightDivisor = height / commonDivisor;
    if (widthDivisor < 100) {
        return widthDivisor + ':' + heightDivisor;
    }
    return (widthDivisor / heightDivisor).toFixed(2);
};
exports.aspectRatio = aspectRatio;
