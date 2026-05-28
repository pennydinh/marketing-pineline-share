export declare const validateConcurrency: ({ setting, value, checkIfValidForCurrentMachine, }: {
    value: unknown;
    setting: string;
    checkIfValidForCurrentMachine: boolean;
}) => void;
export declare const getMaxConcurrency: () => number;
export declare const getMinConcurrency: () => number;
