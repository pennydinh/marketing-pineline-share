"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutputLocation = exports.setOutputLocation = void 0;
let currentOutputLocation = null;
const setOutputLocation = (newOutputLocation) => {
    if (typeof newOutputLocation !== 'string') {
        throw new Error(`outputLocation must be a string but got ${typeof newOutputLocation} (${JSON.stringify(newOutputLocation)})`);
    }
    if (newOutputLocation.trim() === '') {
        throw new Error(`outputLocation must not be an empty string`);
    }
    currentOutputLocation = newOutputLocation;
};
exports.setOutputLocation = setOutputLocation;
const getOutputLocation = () => currentOutputLocation;
exports.getOutputLocation = getOutputLocation;
