import type { StillImageFormat, VideoImageFormat } from '@remotion/renderer';
export declare const determineFinalStillImageFormat: ({ downloadName, outName, configImageFormat, cliFlag, isLambda, fromUi, }: {
    downloadName: string | null;
    outName: string | null;
    configImageFormat: StillImageFormat | null;
    cliFlag: StillImageFormat | VideoImageFormat | null;
    isLambda: boolean;
    fromUi: StillImageFormat | null;
}) => {
    format: StillImageFormat;
    source: string;
};
