"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeight = exports.overrideHeight = void 0;
const validate_1 = require("../validate");
let specifiedHeight;
const overrideHeight = (newHeight) => {
    (0, validate_1.validateDimension)(newHeight, 'height', 'passed to `overrideHeight()`');
    specifiedHeight = newHeight;
};
exports.overrideHeight = overrideHeight;
const getHeight = () => {
    return specifiedHeight;
};
exports.getHeight = getHeight;
