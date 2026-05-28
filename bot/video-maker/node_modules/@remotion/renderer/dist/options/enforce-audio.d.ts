export declare const enforceAudioOption: {
    name: string;
    cliFlag: "enforce-audio-track";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: string;
    docLink: string;
    type: boolean;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        source: string;
        value: true;
    } | {
        source: string;
        value: false;
    };
    setConfig: (value: boolean) => void;
};
