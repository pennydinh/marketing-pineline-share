export declare const enableLambdaInsights: {
    name: string;
    cliFlag: "enable-lambda-insights";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: string;
    docLink: string;
    type: boolean;
    setConfig: (value: boolean) => void;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        value: boolean;
        source: string;
    };
};
