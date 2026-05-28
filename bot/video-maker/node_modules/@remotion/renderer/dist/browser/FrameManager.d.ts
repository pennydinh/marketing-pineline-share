/**
 * Copyright 2017 Google Inc. All rights reserved.
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
import type { LogLevel } from '../log-level';
import type { Page } from './BrowserPage';
import type { CDPSession } from './Connection';
import type { Frame as TFrame } from './devtools-types';
import { DOMWorld } from './DOMWorld';
import type { EvaluateFn, EvaluateFnReturnType, EvaluateHandleFn, SerializableOrJSHandle, UnwrapPromiseLike } from './EvalTypes';
import { EventEmitter } from './EventEmitter';
import { ExecutionContext } from './ExecutionContext';
import type { HTTPResponse } from './HTTPResponse';
import type { JSHandle } from './JSHandle';
import type { PuppeteerLifeCycleEvent } from './LifecycleWatcher';
import { NetworkManager } from './NetworkManager';
export declare const FrameManagerEmittedEvents: {
    FrameNavigated: symbol;
    FrameDetached: symbol;
    FrameSwapped: symbol;
    LifecycleEvent: symbol;
    FrameNavigatedWithinDocument: symbol;
    ExecutionContextCreated: symbol;
    ExecutionContextDestroyed: symbol;
};
export declare class FrameManager extends EventEmitter {
    #private;
    get _client(): CDPSession;
    constructor(client: CDPSession, page: Page, indent: boolean, logLevel: LogLevel);
    private setupEventListeners;
    initialize(client?: CDPSession): Promise<void>;
    networkManager(): NetworkManager;
    navigateFrame(frame: Frame, url: string, timeout: number, options?: {
        referer?: string;
        timeout?: number;
        waitUntil?: PuppeteerLifeCycleEvent;
    }): Promise<HTTPResponse | null>;
    page(): Page;
    mainFrame(): Frame;
    frames(): Frame[];
    frame(frameId: string): Frame | null;
    _ensureIsolatedWorld(session: CDPSession, name: string): Promise<void>;
    executionContextById(contextId: number, session?: CDPSession): ExecutionContext;
}
export declare class Frame {
    #private;
    _frameManager: FrameManager;
    _id: string;
    _loaderId: string;
    _name?: string;
    _hasStartedLoading: boolean;
    _lifecycleEvents: Set<string>;
    _mainWorld: DOMWorld;
    _secondaryWorld: DOMWorld;
    _childFrames: Set<Frame>;
    constructor(frameManager: FrameManager, parentFrame: Frame | null, frameId: string, client: CDPSession);
    _updateClient(client: CDPSession): void;
    isOOPFrame(): boolean;
    goto(url: string, timeout: number, options?: {
        referer?: string;
        waitUntil?: PuppeteerLifeCycleEvent;
    }): Promise<HTTPResponse | null>;
    _client(): CDPSession;
    /**
     * @returns a promise that resolves to the frame's default execution context.
     */
    executionContext(): Promise<ExecutionContext>;
    evaluateHandle<HandlerType extends JSHandle = JSHandle>(pageFunction: EvaluateHandleFn, ...args: SerializableOrJSHandle[]): Promise<HandlerType>;
    evaluate<T extends EvaluateFn>(pageFunction: T, ...args: SerializableOrJSHandle[]): Promise<UnwrapPromiseLike<EvaluateFnReturnType<T>>>;
    url(): string;
    childFrames(): Frame[];
    _navigated(framePayload: TFrame): void;
    _navigatedWithinDocument(url: string): void;
    _onLifecycleEvent(loaderId: string, name: string): void;
    _onLoadingStopped(): void;
    _onLoadingStarted(): void;
    _detach(): void;
}
