export type NumberOfGifLoops = number | null;
export declare const numberOfGifLoopsOption: {
    name: string;
    cliFlag: "number-of-gif-loops";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: "numberOfGifLoops";
    docLink: string;
    type: number | null;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        value: number;
        source: string;
    } | {
        value: null;
        source: string;
    };
    setConfig: (newLoop: NumberOfGifLoops) => void;
};
