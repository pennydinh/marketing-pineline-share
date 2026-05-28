import { ErrorWithStackFrame } from './handle-javascript-exception';
import type { SymbolicateableError } from './symbolicateable-error';
export declare const symbolicateError: (symbolicateableError: SymbolicateableError) => Promise<ErrorWithStackFrame>;
