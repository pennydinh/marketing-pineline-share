import type { PackageManager } from '@remotion/studio-shared';
export type UpdateInfo = {
    currentVersion: string;
    latestVersion: string;
    updateAvailable: boolean;
    timedOut: boolean;
    packageManager: PackageManager | 'unknown';
};
export type Bug = {
    title: string;
    description: string;
    link: string;
    versions: string[];
};
export declare const UpdateCheck: () => import("react/jsx-runtime").JSX.Element | null;
