export declare const encodingMaxRateOption: {
    name: string;
    cliFlag: "max-rate";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: "encodingMaxRate";
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
    setConfig: (newMaxRate: string | null) => void;
};
