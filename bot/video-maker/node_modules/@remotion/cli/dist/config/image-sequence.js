"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShouldOutputImageSequence = exports.setImageSequence = void 0;
let imageSequence = false;
const setImageSequence = (newImageSequence) => {
    if (typeof newImageSequence !== 'boolean') {
        throw new TypeError('setImageSequence accepts a Boolean Value');
    }
    imageSequence = newImageSequence;
};
exports.setImageSequence = setImageSequence;
const getShouldOutputImageSequence = (frameRange) => {
    return imageSequence || typeof frameRange === 'number';
};
exports.getShouldOutputImageSequence = getShouldOutputImageSequence;
