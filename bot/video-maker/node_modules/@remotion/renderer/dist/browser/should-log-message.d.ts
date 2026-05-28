export declare const shouldLogBrowserMessage: (message: string) => boolean;
type ParsedBrowserLogMessage = {
    day: number;
    month: number;
    hour: number;
    minute: number;
    seconds: number;
    microseconds: number;
    level: string;
    location: string;
    lineNumber: number;
    message: string;
};
export declare const parseBrowserLogMessage: (input: string) => ParsedBrowserLogMessage | null;
export declare const formatChromeMessage: (input: string) => {
    output: string;
    tag: string;
} | null;
type ChromeLogLocation = {
    location: string;
    lineNumber: number;
};
export declare const parseChromeLogLocation: (message: string) => ChromeLogLocation | null;
export {};
