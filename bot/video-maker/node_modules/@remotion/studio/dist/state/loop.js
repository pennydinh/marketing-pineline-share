"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadLoopOption = exports.persistLoopOption = void 0;
const key = 'remotion.loop';
const persistLoopOption = (option) => {
    localStorage.setItem(key, String(option));
};
exports.persistLoopOption = persistLoopOption;
const loadLoopOption = () => {
    const item = localStorage.getItem(key);
    return item !== 'false';
};
exports.loadLoopOption = loadLoopOption;
