import type { StaticFile } from 'remotion';
export declare const initPublicFolderWatch: ({ publicDir, onUpdate, staticHash, }: {
    publicDir: string;
    remotionRoot: string;
    onUpdate: () => void;
    staticHash: string;
}) => void;
export declare const fetchFolder: ({ publicDir, staticHash, }: {
    publicDir: string;
    staticHash: string;
}) => void;
export declare const getFiles: () => StaticFile[];
