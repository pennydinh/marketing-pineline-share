export declare const separateAudioOption: {
    cliFlag: string;
    description: () => string;
    docLink: string;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        source: string;
        value: string;
    } | {
        source: string;
        value: null;
    };
    name: string;
    setConfig: () => never;
    ssrName: string;
    type: string | null;
};
