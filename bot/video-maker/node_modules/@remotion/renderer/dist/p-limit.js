"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pLimit = void 0;
const pLimit = (concurrency) => {
    const queue = [];
    let activeCount = 0;
    const next = () => {
        var _a;
        activeCount--;
        if (queue.length > 0) {
            (_a = queue.shift()) === null || _a === void 0 ? void 0 : _a();
        }
    };
    const run = async (fn, resolve, ...args) => {
        activeCount++;
        // eslint-disable-next-line require-await
        const result = (async () => fn(...args))();
        resolve(result);
        try {
            await result;
        }
        catch (_a) { }
        next();
    };
    const enqueue = (fn, resolve, ...args) => {
        queue.push(() => run(fn, resolve, ...args));
        (async () => {
            var _a;
            // This function needs to wait until the next microtask before comparing
            // `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
            // when the run function is dequeued and called. The comparison in the if-statement
            // needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
            await Promise.resolve();
            if (activeCount < concurrency && queue.length > 0) {
                (_a = queue.shift()) === null || _a === void 0 ? void 0 : _a();
            }
        })();
    };
    const generator = (fn, ...args) => new Promise((resolve) => {
        enqueue(fn, resolve, ...args);
    });
    Object.defineProperties(generator, {
        activeCount: {
            get: () => activeCount,
        },
        pendingCount: {
            get: () => queue.length,
        },
        clearQueue: {
            value: () => {
                queue.length = 0;
            },
        },
    });
    return generator;
};
exports.pLimit = pLimit;
