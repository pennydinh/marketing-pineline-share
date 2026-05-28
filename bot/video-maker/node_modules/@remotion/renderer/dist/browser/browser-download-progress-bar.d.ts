import type { LogLevel } from '../log-level';
import type { OnBrowserDownload } from '../options/on-browser-download';
export declare const defaultBrowserDownloadProgress: ({ indent, logLevel, api, }: {
    indent: boolean;
    logLevel: LogLevel;
    api: string;
}) => OnBrowserDownload;
