"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEveryNthFrame = exports.setEveryNthFrame = void 0;
let everyNthFrame = 1;
const setEveryNthFrame = (frame) => {
    everyNthFrame = frame;
};
exports.setEveryNthFrame = setEveryNthFrame;
const getEveryNthFrame = () => {
    return everyNthFrame;
};
exports.getEveryNthFrame = getEveryNthFrame;
