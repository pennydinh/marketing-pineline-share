export type ErrorLocation = {
    fileName: string;
    columnNumber: number;
    lineNumber: number;
    message: string;
};
export declare const getLocationFromBuildError: (err: Error) => ErrorLocation | null;
