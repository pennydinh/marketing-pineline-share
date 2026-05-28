import type { HeadlessBrowser } from './browser/Browser';
import type { LogLevel } from './log-level';
export type BrowserReplacer = {
    getBrowser: () => HeadlessBrowser;
    replaceBrowser: (make: () => Promise<HeadlessBrowser>, makeNewPages: () => Promise<void>) => Promise<HeadlessBrowser>;
};
export declare const handleBrowserCrash: (instance: HeadlessBrowser, logLevel: LogLevel, indent: boolean) => BrowserReplacer;
