/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { SomeStackFrame, SymbolicatedStackFrame } from '@remotion/studio-shared';
export declare const getFileContents: (fileName: string) => Promise<string>;
export declare const unmap: (frames: SomeStackFrame[], contextLines: number) => Promise<SymbolicatedStackFrame[]>;
