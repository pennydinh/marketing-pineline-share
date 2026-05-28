"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMuteOption = exports.persistMuteOption = void 0;
const key = 'remotion.mute';
const persistMuteOption = (option) => {
    localStorage.setItem(key, String(option));
};
exports.persistMuteOption = persistMuteOption;
const loadMuteOption = () => {
    const item = localStorage.getItem(key);
    return item === 'true';
};
exports.loadMuteOption = loadMuteOption;
