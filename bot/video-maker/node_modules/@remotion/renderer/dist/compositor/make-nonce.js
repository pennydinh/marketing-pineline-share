"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNonce = void 0;
const makeNonce = () => {
    return (Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15));
};
exports.makeNonce = makeNonce;
