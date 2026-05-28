import type { Crf } from '../crf';
export declare const validateCrf: (newCrf: Crf) => void;
export declare const crfOption: {
    name: string;
    cliFlag: "crf";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: string;
    docLink: string;
    type: number;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        source: string;
        value: Crf;
    };
    setConfig: (crf: Crf) => void;
};
