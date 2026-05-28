import type { StackFrame } from '@remotion/studio-shared';
export declare const makeStackFrame: ({ functionName, fileName, lineNumber, columnNumber, }: {
    functionName: string | null;
    fileName: string;
    lineNumber: number;
    columnNumber: number;
}) => StackFrame;
