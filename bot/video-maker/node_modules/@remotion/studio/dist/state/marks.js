"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMarks = exports.persistMarks = void 0;
const localStorageKey = () => `remotion.editor.marksv2`;
const persistMarks = (marks) => {
    localStorage.setItem(localStorageKey(), JSON.stringify(marks));
};
exports.persistMarks = persistMarks;
const loadMarks = () => {
    const item = localStorage.getItem(localStorageKey());
    if (item === null) {
        return {};
    }
    return JSON.parse(item);
};
exports.loadMarks = loadMarks;
