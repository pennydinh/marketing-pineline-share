"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlaybackRate = exports.persistPlaybackRate = void 0;
const key = 'remotion.playbackrate';
const persistPlaybackRate = (option) => {
    localStorage.setItem(key, String(option));
};
exports.persistPlaybackRate = persistPlaybackRate;
const loadPlaybackRate = () => {
    if (typeof window !== 'undefined') {
        return 1;
    }
    const item = localStorage.getItem(key);
    if (item === null) {
        return 1;
    }
    return Number(item);
};
exports.loadPlaybackRate = loadPlaybackRate;
