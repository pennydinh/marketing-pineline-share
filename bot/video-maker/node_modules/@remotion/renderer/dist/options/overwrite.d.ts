export declare const overwriteOption: {
    name: string;
    cliFlag: "overwrite";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: string;
    docLink: string;
    type: boolean;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }, defaultValue: boolean) => {
        source: string;
        value: boolean;
    };
    setConfig: (value: boolean) => void;
};
