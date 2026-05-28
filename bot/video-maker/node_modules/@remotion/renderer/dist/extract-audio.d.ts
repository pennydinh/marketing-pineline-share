import type { LogLevel } from './log-level';
export declare const extractAudio: (options: {
    videoSource: string;
    audioOutput: string;
    logLevel?: LogLevel;
    binariesDirectory?: string | null;
}) => Promise<void>;
