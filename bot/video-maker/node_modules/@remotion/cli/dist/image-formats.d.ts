import type { VideoImageFormat } from '@remotion/renderer';
import { ConfigInternals } from './config';
export declare const getVideoImageFormat: ({ codec, uiImageFormat, }: {
    codec: ReturnType<typeof ConfigInternals.getOutputCodecOrUndefined>;
    uiImageFormat: VideoImageFormat | null;
}) => VideoImageFormat;
