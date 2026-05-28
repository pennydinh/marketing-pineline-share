export declare const ensureFramesInOrder: (framesToRender: number[]) => {
    waitForRightTimeOfFrameToBeInserted: (frameToBe: number) => Promise<void>;
    setFrameToStitch: (f: number) => void;
    waitForFinish: () => Promise<void>;
};
