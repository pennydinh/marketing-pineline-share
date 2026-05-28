/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { SomeStackFrame, StackFrame } from '@remotion/studio-shared';
export declare function parseStack(stack: string[]): StackFrame[];
export declare const parseError: (error: Error | string | string[], contextLines: number) => Promise<SomeStackFrame[]>;
