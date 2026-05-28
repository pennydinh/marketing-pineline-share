import type { StillImageFormat, VideoImageFormat } from '@remotion/renderer';
export declare const setStillImageFormat: (format: StillImageFormat) => void;
export declare const setVideoImageFormat: (format: VideoImageFormat) => void;
export declare const getUserPreferredStillImageFormat: () => "png" | "jpeg" | "pdf" | "webp" | undefined;
export declare const getUserPreferredVideoImageFormat: () => "png" | "jpeg" | "none" | undefined;
