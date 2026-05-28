"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setClickLock = exports.getClickLock = void 0;
let clickLock = false;
const getClickLock = () => clickLock;
exports.getClickLock = getClickLock;
const setClickLock = (lock) => {
    clickLock = lock;
};
exports.setClickLock = setClickLock;
