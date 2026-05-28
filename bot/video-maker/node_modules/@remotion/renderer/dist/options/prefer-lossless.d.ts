export declare const preferLosslessAudioOption: {
    name: string;
    cliFlag: "prefer-lossless";
    description: () => import("react/jsx-runtime").JSX.Element;
    docLink: string;
    type: boolean;
    ssrName: "preferLossless";
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        value: true;
        source: string;
    } | {
        value: false;
        source: string;
    };
    setConfig: (val: boolean) => void;
};
