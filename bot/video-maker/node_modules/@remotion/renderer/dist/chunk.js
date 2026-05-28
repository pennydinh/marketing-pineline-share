"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunk = void 0;
const chunk = (input, size) => {
    return input.reduce((arr, item, idx) => {
        return idx % size === 0
            ? [...arr, [item]]
            : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    }, []);
};
exports.chunk = chunk;
