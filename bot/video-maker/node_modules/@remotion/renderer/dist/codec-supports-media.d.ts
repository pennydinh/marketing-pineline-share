import type { Codec } from './codec';
type MediaSupport = {
    video: boolean;
    audio: boolean;
};
export declare const codecSupportsMedia: (codec: Codec) => MediaSupport;
export declare const codecSupportsCrf: (codec: Codec) => boolean;
export declare const codecSupportsVideoBitrate: (codec: Codec) => boolean;
export {};
