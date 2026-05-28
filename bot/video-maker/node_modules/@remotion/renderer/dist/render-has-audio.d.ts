import type { RenderAssetInfo } from './assets/download-map';
import type { Codec } from './codec';
export declare const getShouldRenderAudio: ({ codec, assetsInfo, enforceAudioTrack, muted, }: {
    codec: Codec;
    assetsInfo: RenderAssetInfo | null;
    enforceAudioTrack: boolean;
    muted: boolean;
}) => 'yes' | 'maybe' | 'no';
