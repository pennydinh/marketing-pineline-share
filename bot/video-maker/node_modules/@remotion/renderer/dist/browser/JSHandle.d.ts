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
import type { CDPSession } from './Connection';
import type { DevtoolsRemoteObject } from './devtools-types';
import type { EvaluateHandleFn, SerializableOrJSHandle } from './EvalTypes';
import type { ExecutionContext } from './ExecutionContext';
export declare function _createJSHandle(context: ExecutionContext, remoteObject: DevtoolsRemoteObject): JSHandle;
export declare class JSHandle {
    #private;
    get _disposed(): boolean;
    get _remoteObject(): DevtoolsRemoteObject;
    get _context(): ExecutionContext;
    constructor(context: ExecutionContext, client: CDPSession, remoteObject: DevtoolsRemoteObject);
    executionContext(): ExecutionContext;
    evaluateHandle<HandleType extends JSHandle = JSHandle>(pageFunction: EvaluateHandleFn, ...args: SerializableOrJSHandle[]): Promise<HandleType>;
    asElement(): ElementHandle | null;
    dispose(): Promise<void>;
    toString(): string;
}
export declare class ElementHandle<ElementType extends Element = Element> extends JSHandle {
    asElement(): ElementHandle<ElementType> | null;
}
