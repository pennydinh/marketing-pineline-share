export declare const publicPathOption: {
    name: string;
    cliFlag: "public-path";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: "publicPath";
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
    setConfig: (value: string | null) => void;
    type: string | null;
};
