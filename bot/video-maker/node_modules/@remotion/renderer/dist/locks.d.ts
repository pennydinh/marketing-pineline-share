export declare const createLock: ({ timeout }: {
    timeout: number | null;
}) => {
    lock: () => number;
    unlock: (id: number) => void;
    waitForAllToBeDone: () => Promise<unknown>;
};
