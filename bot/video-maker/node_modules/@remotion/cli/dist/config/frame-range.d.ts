import type { FrameRange } from '@remotion/renderer';
export declare const setFrameRange: (newFrameRange: FrameRange | null) => void;
export declare const setFrameRangeFromCli: (newFrameRange: string | number) => void;
export declare const getRange: () => FrameRange | null;
