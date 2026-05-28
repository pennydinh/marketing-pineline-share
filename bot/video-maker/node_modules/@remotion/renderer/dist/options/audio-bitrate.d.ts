export declare const audioBitrateOption: {
    name: string;
    cliFlag: "audio-bitrate";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: string;
    docLink: string;
    type: string;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        value: string;
        source: string;
    } | {
        value: null;
        source: string;
    };
    setConfig: (value: string | null) => void;
};
