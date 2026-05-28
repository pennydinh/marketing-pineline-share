import type { LogLevel } from '../log-level';
export declare function isMusl({ indent, logLevel, }: {
    indent: boolean;
    logLevel: LogLevel;
}): boolean;
export declare const getExecutablePath: ({ indent, logLevel, type, binariesDirectory, }: {
    type: 'compositor' | 'ffmpeg' | 'ffprobe';
    indent: boolean;
    logLevel: LogLevel;
    binariesDirectory: string | null;
}) => string;
export declare const getExecutableDir: (indent: boolean, logLevel: LogLevel) => string;
