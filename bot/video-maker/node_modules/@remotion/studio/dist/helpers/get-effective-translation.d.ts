import type { Size } from '@remotion/player';
import type { Translation } from 'remotion';
export declare const getEffectiveTranslation: ({ canvasSize, scale, compositionHeight, compositionWidth, translation, }: {
    canvasSize: Size;
    scale: number;
    compositionWidth: number;
    compositionHeight: number;
    translation: {
        x: number;
        y: number;
    };
}) => {
    x: number;
    y: number;
};
export declare const getCenterPointWhileScrolling: ({ size, clientX, clientY, compositionWidth, compositionHeight, scale, translation, }: {
    size: Size;
    clientX: number;
    clientY: number;
    compositionWidth: number;
    compositionHeight: number;
    scale: number;
    translation: Translation;
}) => {
    centerX: number;
    centerY: number;
};
