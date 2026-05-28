export declare const folderExpiryOption: {
    name: string;
    cliFlag: "enable-folder-expiry";
    description: () => import("react/jsx-runtime").JSX.Element;
    ssrName: "enableFolderExpiry";
    docLink: string;
    type: boolean | null;
    getValue: ({ commandLine }: {
        commandLine: Record<string, unknown>;
    }) => {
        source: string;
        value: boolean | null;
    };
    setConfig: (value: boolean | null) => void;
};
