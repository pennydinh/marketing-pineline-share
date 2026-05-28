export declare const getOffthreadVideoCacheSizeInBytes: () => number | null;
export declare const offthreadVideoCacheSizeInBytesOption: {
    name: string;
    cliFlag: "offthreadvideo-cache-size-in-bytes";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: "offthreadVideoCacheSizeInBytes";
    docLink: string;
    type: number | null;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        source: string;
        value: number;
    } | {
        source: string;
        value: null;
    };
    setConfig: (size: number | null) => void;
};
export declare const validateOffthreadVideoCacheSizeInBytes: (option: unknown) => void;
