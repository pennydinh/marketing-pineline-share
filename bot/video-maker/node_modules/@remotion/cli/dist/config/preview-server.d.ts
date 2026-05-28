/**
 *
 * @param port
 * @deprecated Use the `setStudioPort` and `setRendererPort` functions instead
 * @returns
 */
export declare const setPort: (port: number | undefined) => void;
export declare const setStudioPort: (port: number | undefined) => void;
export declare const setRendererPort: (port: number | undefined) => void;
export declare const getStudioPort: () => number | undefined;
export declare const getRendererPortFromConfigFile: () => number | null;
export declare const getRendererPortFromConfigFileAndCliFlag: () => number | null;
