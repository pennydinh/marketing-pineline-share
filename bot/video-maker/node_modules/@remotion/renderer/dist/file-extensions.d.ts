import type { Codec } from './codec';
import type { supportedAudioCodecs } from './options/audio-codec';
export type FileExtension = 'aac' | '3gp' | 'm4a' | 'm4b' | 'mpg' | 'mpeg' | 'mkv' | 'mp4' | 'gif' | 'hevc' | 'mp3' | 'mov' | 'mxf' | 'wav' | 'ts' | 'webm';
export declare const defaultFileExtensionMap: {
    [key in Codec]: {
        default: FileExtension;
        forAudioCodec: {
            [k in (typeof supportedAudioCodecs)[key][number]]: {
                possible: FileExtension[];
                default: FileExtension;
            };
        };
    };
};
