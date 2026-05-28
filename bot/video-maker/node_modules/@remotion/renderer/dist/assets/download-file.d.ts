import type { LogLevel } from '../log-level';
type Response = {
    sizeInBytes: number;
    to: string;
};
type Options = {
    url: string;
    to: (contentDisposition: string | null, contentType: string | null) => string;
    onProgress: ((progress: {
        percent: number | null;
        downloaded: number;
        totalSize: number | null;
    }) => void) | undefined;
    logLevel: LogLevel;
    indent: boolean;
};
export declare const downloadFile: (options: Options, retries?: number, attempt?: number) => Promise<Response>;
export {};
