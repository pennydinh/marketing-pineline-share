import type { GitSource } from './git-source';
export declare const getProjectName: ({ gitSource, resolvedRemotionRoot, basename, }: {
    gitSource: GitSource | null;
    resolvedRemotionRoot: string;
    basename: (str: string) => string;
}) => string;
