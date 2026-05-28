"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWidth = exports.overrideWidth = void 0;
const validate_1 = require("../validate");
let passedWidth = null;
const overrideWidth = (newWidth) => {
    if (typeof newWidth !== 'number') {
        (0, validate_1.validateDimension)(newWidth, 'width', 'passed to `setWidth()`');
    }
    passedWidth = newWidth;
};
exports.overrideWidth = overrideWidth;
const getWidth = () => {
    return passedWidth;
};
exports.getWidth = getWidth;
