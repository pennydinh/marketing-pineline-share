import type { AudioCodec, Codec } from '@remotion/renderer';
import type { RenderType } from './RenderModalAdvanced';
export declare const getDefaultCodecs: ({ defaultConfigurationVideoCodec, compositionDefaultVideoCodec, renderType, defaultConfigurationAudioCodec, }: {
    defaultConfigurationVideoCodec: Codec | null;
    defaultConfigurationAudioCodec: AudioCodec | null;
    compositionDefaultVideoCodec: Codec | null;
    renderType: RenderType;
}) => {
    initialAudioCodec: AudioCodec;
    initialVideoCodec: Codec;
    initialRenderType: RenderType;
    initialVideoCodecForAudioTab: Codec;
    initialVideoCodecForVideoTab: Codec;
};
