"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBufferStateDelayInMilliseconds = exports.getBufferStateDelayInMilliseconds = void 0;
let value = null;
const getBufferStateDelayInMilliseconds = () => {
    return value;
};
exports.getBufferStateDelayInMilliseconds = getBufferStateDelayInMilliseconds;
const setBufferStateDelayInMilliseconds = (val) => {
    value = val;
};
exports.setBufferStateDelayInMilliseconds = setBufferStateDelayInMilliseconds;
