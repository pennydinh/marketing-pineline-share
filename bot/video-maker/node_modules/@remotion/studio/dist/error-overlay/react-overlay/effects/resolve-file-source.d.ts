import type { ErrorLocation, SymbolicatedStackFrame } from '@remotion/studio-shared';
export declare const resolveFileSource: (location: ErrorLocation, contextLines: number) => Promise<SymbolicatedStackFrame>;
