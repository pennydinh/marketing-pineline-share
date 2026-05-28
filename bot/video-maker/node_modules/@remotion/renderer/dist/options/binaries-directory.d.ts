export declare const binariesDirectoryOption: {
    name: string;
    cliFlag: "binaries-directory";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: "binariesDirectory";
    docLink: string;
    type: string | null;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        source: string;
        value: string | null;
    };
    setConfig: (value: string | null) => void;
};
