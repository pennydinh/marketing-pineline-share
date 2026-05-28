"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimelineFlex = void 0;
const localStorageKey = (id) => `remotion.editor.timelineFlex.${id}`;
const persistTimelineFlex = (value, id) => {
    localStorage.setItem(localStorageKey(id), String(value));
};
const loadTimelineFlex = (id) => {
    const item = localStorage.getItem(localStorageKey(id));
    return item ? parseFloat(item) : null;
};
const useTimelineFlex = (id) => {
    return [
        loadTimelineFlex(id),
        (value) => persistTimelineFlex(value, id),
    ];
};
exports.useTimelineFlex = useTimelineFlex;
