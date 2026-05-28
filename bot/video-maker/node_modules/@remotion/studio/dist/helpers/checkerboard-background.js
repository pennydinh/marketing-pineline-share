"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkerboardBackgroundImage = exports.checkerboardBackgroundColor = exports.getCheckerboardBackgroundPos = exports.getCheckerboardBackgroundSize = void 0;
const getCheckerboardBackgroundSize = (size) => `${size}px ${size}px`;
exports.getCheckerboardBackgroundSize = getCheckerboardBackgroundSize;
const getCheckerboardBackgroundPos = (size) => `0 0, ${size / 2}px 0, ${size / 2}px -${size / 2}px, 0px ${size / 2}px`;
exports.getCheckerboardBackgroundPos = getCheckerboardBackgroundPos;
const checkerboardBackgroundColor = (checkerboard) => {
    if (checkerboard) {
        return 'white';
    }
    return 'black';
};
exports.checkerboardBackgroundColor = checkerboardBackgroundColor;
const checkerboardBackgroundImage = (checkerboard) => {
    if (checkerboard) {
        return `
     linear-gradient(
        45deg,
        rgba(0, 0, 0, 0.1) 25%,
        transparent 25%
      ),
      linear-gradient(135deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, 0.1) 75%),
      linear-gradient(135deg, transparent 75%, rgba(0, 0, 0, 0.1) 75%)
    `;
    }
    return undefined;
};
exports.checkerboardBackgroundImage = checkerboardBackgroundImage;
