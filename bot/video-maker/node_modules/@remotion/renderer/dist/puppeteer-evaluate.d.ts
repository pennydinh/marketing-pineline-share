import type { Page } from './browser/BrowserPage';
type PuppeteerCatchOptions = {
    page: Page;
    pageFunction: Function;
    frame: number | null;
    args: unknown[];
    timeoutInMilliseconds: number;
};
export declare function puppeteerEvaluateWithCatchAndTimeout<ReturnType>({ args, frame, page, pageFunction, timeoutInMilliseconds, }: PuppeteerCatchOptions): Promise<{
    value: ReturnType;
    size: number;
}>;
export declare function puppeteerEvaluateWithCatch<ReturnType>({ page, pageFunction, frame, args, }: PuppeteerCatchOptions): Promise<{
    value: ReturnType;
    size: number;
}>;
export {};
