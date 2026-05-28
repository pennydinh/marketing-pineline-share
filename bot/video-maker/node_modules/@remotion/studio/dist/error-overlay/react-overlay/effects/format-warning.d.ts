/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ReactFrame } from './proxy-console';
export declare function massageWarning(warning: string, frames: ReactFrame[]): {
    message: string;
    stack: string;
};
