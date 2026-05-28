"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureFramesInOrder = void 0;
const ensureFramesInOrder = (framesToRender) => {
    let [frameToStitch] = framesToRender;
    const finalFrame = framesToRender[framesToRender.length - 1];
    let waiters = [];
    const resolveWaiters = () => {
        for (const waiter of waiters.slice(0)) {
            if (frameToStitch === waiter.forFrame) {
                waiter.resolve();
                waiters = waiters.filter((w) => w.id !== waiter.id);
            }
        }
    };
    const waitForRightTimeOfFrameToBeInserted = (frameToBe) => {
        return new Promise((resolve) => {
            waiters.push({
                id: String(Math.random()),
                forFrame: frameToBe,
                resolve,
            });
            resolveWaiters();
        });
    };
    const setFrameToStitch = (f) => {
        frameToStitch = f;
        resolveWaiters();
    };
    const waitForFinish = async () => {
        await waitForRightTimeOfFrameToBeInserted(finalFrame + 1);
    };
    return {
        waitForRightTimeOfFrameToBeInserted,
        setFrameToStitch,
        waitForFinish,
    };
};
exports.ensureFramesInOrder = ensureFramesInOrder;
