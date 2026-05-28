export type DeleteAfter = '1-day' | '3-days' | '7-days' | '30-days';
export declare const deleteAfterOption: {
    name: string;
    cliFlag: "delete-after";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: "deleteAfter";
    docLink: string;
    type: DeleteAfter | null;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        source: string;
        value: DeleteAfter;
    } | {
        source: string;
        value: null;
    };
    setConfig: (value: DeleteAfter | null) => void;
};
