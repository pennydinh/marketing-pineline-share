/**
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { HeadlessBrowser } from './Browser';
import type { EvaluateFn, EvaluateFnReturnType, EvaluateHandleFn, SerializableOrJSHandle, UnwrapPromiseLike } from './EvalTypes';
import type { ExecutionContext } from './ExecutionContext';
import type { Frame } from './FrameManager';
import type { JSHandle } from './JSHandle';
export declare class DOMWorld {
    #private;
    get _waitTasks(): Set<WaitTask>;
    constructor(frame: Frame);
    frame(): Frame;
    _setContext(context: ExecutionContext | null): void;
    _hasContext(): boolean;
    _detach(): void;
    executionContext(): Promise<ExecutionContext>;
    evaluateHandle<HandlerType extends JSHandle = JSHandle>(pageFunction: EvaluateHandleFn, ...args: SerializableOrJSHandle[]): Promise<HandlerType>;
    evaluate<T extends EvaluateFn>(pageFunction: T, ...args: SerializableOrJSHandle[]): Promise<UnwrapPromiseLike<EvaluateFnReturnType<T>>>;
    waitForFunction({ browser, timeout, pageFunction, title, }: {
        browser: HeadlessBrowser;
        timeout: number | null;
        pageFunction: Function | string;
        title: string;
    }): WaitTask;
}
interface WaitTaskOptions {
    domWorld: DOMWorld;
    predicateBody: Function | string;
    title: string;
    timeout: number | null;
    browser: HeadlessBrowser;
    args: SerializableOrJSHandle[];
}
declare class WaitTask {
    #private;
    promise: Promise<JSHandle>;
    constructor(options: WaitTaskOptions);
    onBrowserClose: () => void;
    onBrowserCloseSilent: () => void;
    terminate(error: Error | null): void;
    rerun(): Promise<void>;
}
export {};
