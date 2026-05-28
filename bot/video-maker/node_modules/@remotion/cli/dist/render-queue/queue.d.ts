import type { LogLevel } from '@remotion/renderer';
import type { RenderJob, RenderJobWithCleanup } from '@remotion/studio-server';
export declare const getRenderQueue: () => RenderJob[];
export declare const addJob: ({ job, entryPoint, remotionRoot, logLevel, }: {
    job: RenderJobWithCleanup;
    entryPoint: string;
    remotionRoot: string;
    logLevel: LogLevel;
}) => void;
export declare const removeJob: (jobId: string) => void;
export declare const cancelJob: (jobId: string) => void;
