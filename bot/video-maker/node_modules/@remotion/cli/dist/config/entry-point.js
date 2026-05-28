"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntryPoint = exports.setEntryPoint = void 0;
let entryPoint = null;
const setEntryPoint = (ep) => {
    entryPoint = ep;
};
exports.setEntryPoint = setEntryPoint;
const getEntryPoint = () => {
    return entryPoint;
};
exports.getEntryPoint = getEntryPoint;
