import type { AudioCodec, Codec, StillImageFormat } from '@remotion/renderer';
import type { RenderType } from './RenderModalAdvanced';
export declare const validateOutnameGui: ({ outName, codec, audioCodec, renderMode, stillImageFormat, separateAudioTo, }: {
    outName: string;
    codec: Codec;
    audioCodec: AudioCodec;
    renderMode: RenderType;
    stillImageFormat: StillImageFormat | null;
    separateAudioTo: string | null;
}) => {
    valid: true;
} | {
    valid: false;
    error: Error;
};
export declare const isValidSeparateAudioName: ({ audioCodec, separateAudioTo, }: {
    separateAudioTo: string;
    audioCodec: AudioCodec;
}) => void;
