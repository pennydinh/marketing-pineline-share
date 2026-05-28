type ReturnType = {
    extraFramesToCaptureAssetsFrontend: number[];
    extraFramesToCaptureAssetsBackend: number[];
    trimLeftOffset: number;
    trimRightOffset: number;
    chunkLengthInSeconds: number;
};
export declare const getExtraFramesToCapture: ({ compositionStart, realFrameRange, fps, forSeamlessAacConcatenation, }: {
    fps: number;
    compositionStart: number;
    realFrameRange: [number, number];
    forSeamlessAacConcatenation: boolean;
}) => ReturnType;
export {};
