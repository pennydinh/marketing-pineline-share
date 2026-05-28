export declare const webhookCustomDataOption: {
    name: string;
    cliFlag: "webhook-custom-data";
    description: (type: "cli" | "ssr") => import("react/jsx-runtime").JSX.Element;
    ssrName: "customData";
    docLink: string;
    type: Record<string, unknown> | null;
    getValue: () => never;
    setConfig: () => never;
};
