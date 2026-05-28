import type { LogLevel, OnBrowserDownload } from '@remotion/renderer';
export declare const defaultBrowserDownloadProgress: ({ indent, logLevel, quiet, }: {
    indent: boolean;
    logLevel: LogLevel;
    quiet: boolean;
}) => OnBrowserDownload;
