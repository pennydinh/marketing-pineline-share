export declare const setJpegQuality: (q: number | undefined) => void;
export declare const getJpegQuality: () => number;
export declare const jpegQualityOption: {
    name: string;
    cliFlag: "jpeg-quality";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: string;
    docLink: string;
    type: number;
    setConfig: (q: number | undefined) => void;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        source: string;
        value: number;
    };
};
