export declare const getForSeamlessAacConcatenation: () => boolean;
export declare const forSeamlessAacConcatenationOption: {
    name: string;
    cliFlag: "for-seamless-aac-concatenation";
    description: () => import("react/jsx-runtime").JSX.Element;
    docLink: string;
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
    ssrName: string;
    type: boolean;
};
