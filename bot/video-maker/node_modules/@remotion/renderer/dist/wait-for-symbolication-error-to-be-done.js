"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForSymbolicationToBeDone = exports.unlockErrorSymbolicationLock = exports.registerErrorSymbolicationLock = void 0;
const locks_1 = require("./locks");
const { lock, unlock, waitForAllToBeDone } = (0, locks_1.createLock)({ timeout: 50000 });
exports.registerErrorSymbolicationLock = lock;
exports.unlockErrorSymbolicationLock = unlock;
exports.waitForSymbolicationToBeDone = waitForAllToBeDone;
