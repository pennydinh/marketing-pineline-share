import type { Page } from './browser/BrowserPage';
import type { LogLevel } from './log-level';
export declare const waitForReady: ({ page, timeoutInMilliseconds, frame, indent, logLevel, }: {
    page: Page;
    timeoutInMilliseconds: number;
    frame: number | null;
    indent: boolean;
    logLevel: LogLevel;
}) => Promise<unknown>;
export declare const seekToFrame: ({ frame, page, composition, timeoutInMilliseconds, logLevel, indent, attempt, }: {
    frame: number;
    composition: string;
    page: Page;
    timeoutInMilliseconds: number;
    logLevel: LogLevel;
    indent: boolean;
    attempt: number;
}) => Promise<void>;
