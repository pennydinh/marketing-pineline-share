export declare const videoBitrateOption: {
    name: string;
    cliFlag: "video-bitrate";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: string;
    docLink: string;
    type: string | null;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        source: string;
        value: string | null;
    };
    setConfig: (bitrate: string | null) => void;
};
