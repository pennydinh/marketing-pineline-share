export declare const registerErrorSymbolicationLock: () => number;
export declare const unlockErrorSymbolicationLock: (id: number) => void;
export declare const waitForSymbolicationToBeDone: () => Promise<unknown>;
