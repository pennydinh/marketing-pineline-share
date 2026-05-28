export declare const encodingBufferSizeOption: {
    name: string;
    cliFlag: "buffer-size";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: "encodingBufferSize";
    docLink: string;
    type: string | null;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        value: string;
        source: string;
    } | {
        value: null;
        source: string;
    };
    setConfig: (bitrate: string | null) => void;
};
