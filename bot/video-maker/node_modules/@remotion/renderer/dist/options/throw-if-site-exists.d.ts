export declare const throwIfSiteExistsOption: {
    cliFlag: string;
    description: () => string;
    docLink: string;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        source: string;
        value: boolean;
    };
    name: string;
    setConfig: () => never;
    ssrName: string;
    type: boolean;
};
