import type { StaticFile } from 'remotion';
export declare const readRecursively: ({ folder, output, startPath, staticHash, limit, }: {
    folder: string;
    startPath: string;
    output?: StaticFile[] | undefined;
    staticHash: string;
    limit: number;
}) => StaticFile[];
