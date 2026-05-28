export declare const delayRenderTimeoutInMillisecondsOption: {
    name: string;
    cliFlag: "timeout";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: "timeoutInMilliseconds";
    docLink: string;
    type: number;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        source: string;
        value: number;
    };
    setConfig: (value: number) => void;
};
