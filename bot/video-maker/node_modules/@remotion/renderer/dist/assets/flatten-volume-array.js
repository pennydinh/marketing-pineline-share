"use strict";
// An input is an array with volume levels for each frame, like
// [1, 1, 1, 1, 1, ...].
// If all elements are the same, we flatten it to `1`, otherwise we leave it as an array.
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertAssetToFlattenedVolume = exports.flattenVolumeArray = void 0;
const flattenVolumeArray = (volume) => {
    if (typeof volume === 'number') {
        return volume;
    }
    if (volume.length === 0) {
        throw new TypeError('Volume array must have at least 1 number');
    }
    if (new Set(volume).size === 1) {
        return volume[0];
    }
    return volume;
};
exports.flattenVolumeArray = flattenVolumeArray;
const convertAssetToFlattenedVolume = (asset) => {
    return {
        ...asset,
        volume: (0, exports.flattenVolumeArray)(asset.volume),
    };
};
exports.convertAssetToFlattenedVolume = convertAssetToFlattenedVolume;
