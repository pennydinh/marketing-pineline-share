"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConcurrency = exports.setConcurrency = void 0;
let currentConcurrency = null;
const setConcurrency = (newConcurrency) => {
    currentConcurrency = newConcurrency;
};
exports.setConcurrency = setConcurrency;
const getConcurrency = () => {
    return currentConcurrency;
};
exports.getConcurrency = getConcurrency;
