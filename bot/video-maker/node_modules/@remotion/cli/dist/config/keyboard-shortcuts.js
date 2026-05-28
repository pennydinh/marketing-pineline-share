"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyboardShortcutsEnabled = exports.setKeyboardShortcutsEnabled = void 0;
let shortcutsEnabled = true;
const setKeyboardShortcutsEnabled = (enabled) => {
    shortcutsEnabled = enabled;
};
exports.setKeyboardShortcutsEnabled = setKeyboardShortcutsEnabled;
const getKeyboardShortcutsEnabled = () => {
    return shortcutsEnabled;
};
exports.getKeyboardShortcutsEnabled = getKeyboardShortcutsEnabled;
