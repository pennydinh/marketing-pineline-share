"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCompositionDuration = exports.validateCompositionDimension = exports.validateCompositionName = void 0;
const remotion_1 = require("remotion");
const validateCompositionName = (compName, compositions) => {
    if (!remotion_1.Internals.isCompositionIdValid(compName)) {
        return remotion_1.Internals.invalidCompositionErrorMessage;
    }
    if (compositions.find((c) => c.id === compName)) {
        return `A composition with that name already exists.`;
    }
    return null;
};
exports.validateCompositionName = validateCompositionName;
const validateCompositionDimension = (dimension, value) => {
    if (Number(value) % 2 !== 0) {
        return `${dimension} should be divisible by 2, since H264 codec doesn't support odd dimensions.`;
    }
    if (Number.isNaN(Number(value))) {
        return 'Invalid number.';
    }
    if (Number(value) === 0) {
        return dimension + ' cannot be zero.';
    }
    return null;
};
exports.validateCompositionDimension = validateCompositionDimension;
const validateCompositionDuration = (value) => {
    if (value % 1 !== 0) {
        return `Duration must be an integer.`;
    }
    if (Number.isNaN(value)) {
        return 'Invalid number.';
    }
    if (value === 0) {
        return 'Duration cannot be zero.';
    }
    return null;
};
exports.validateCompositionDuration = validateCompositionDuration;
