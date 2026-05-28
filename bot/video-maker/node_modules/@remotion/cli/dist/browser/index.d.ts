import type { LogLevel } from '@remotion/renderer';
export declare const BROWSER_COMMAND = "browser";
export declare const browserCommand: (args: string[], logLevel: LogLevel) => Promise<void> | undefined;
