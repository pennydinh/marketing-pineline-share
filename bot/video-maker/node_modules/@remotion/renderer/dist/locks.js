"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLock = void 0;
const createLock = ({ timeout }) => {
    let locks = [];
    const waiters = [];
    const lock = () => {
        const id = Math.random();
        locks.push(id);
        return id;
    };
    const unlock = (id) => {
        locks = locks.filter((l) => l !== id);
        resolveWaiters();
    };
    const resolveWaiters = () => {
        if (locks.length === 0) {
            waiters.forEach((w) => w());
        }
    };
    const waitForAllToBeDone = () => {
        const success = new Promise((resolve) => {
            waiters.push(() => {
                resolve();
            });
        });
        resolveWaiters();
        if (locks.length === 0) {
            return Promise.resolve();
        }
        if (timeout === null) {
            return success;
        }
        const timeoutFn = new Promise((resolve) => {
            setTimeout(() => {
                return resolve();
            }, timeout);
        });
        return Promise.race([success, timeoutFn]);
    };
    return {
        lock,
        unlock,
        waitForAllToBeDone,
    };
};
exports.createLock = createLock;
