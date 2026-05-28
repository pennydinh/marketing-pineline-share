"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineFinalStillImageFormat = void 0;
const deriveExtensionFromFilename = (filename) => {
    if (filename === null || filename === void 0 ? void 0 : filename.endsWith('.png')) {
        return 'png';
    }
    if (filename === null || filename === void 0 ? void 0 : filename.endsWith('.jpg')) {
        return 'jpeg';
    }
    if (filename === null || filename === void 0 ? void 0 : filename.endsWith('.jpeg')) {
        return 'jpeg';
    }
    if (filename === null || filename === void 0 ? void 0 : filename.endsWith('.pdf')) {
        return 'pdf';
    }
    if (filename === null || filename === void 0 ? void 0 : filename.endsWith('.webp')) {
        return 'webp';
    }
    return null;
};
const determineFinalStillImageFormat = ({ downloadName, outName, configImageFormat, cliFlag, isLambda, fromUi, }) => {
    if (fromUi) {
        return { format: fromUi, source: 'via UI' };
    }
    const outNameExtension = deriveExtensionFromFilename(outName);
    const downloadNameExtension = deriveExtensionFromFilename(downloadName);
    const outNameDescription = isLambda ? 'S3 output key' : 'out name';
    if (outNameExtension &&
        downloadNameExtension &&
        outNameExtension !== downloadNameExtension) {
        throw new TypeError(`Image format mismatch: ${outName} was given as the ${outNameDescription} and ${downloadName} was given as the download name, but the extensions don't match.`);
    }
    if (downloadNameExtension) {
        if (cliFlag && downloadNameExtension !== cliFlag) {
            throw new TypeError(`Image format mismatch: ${downloadName} was given as the download name, but --image-format=${cliFlag} was passed. The image formats must match.`);
        }
        return { format: downloadNameExtension, source: 'Download name extension' };
    }
    if (outNameExtension) {
        if (cliFlag && outNameExtension !== cliFlag) {
            throw new TypeError(`Image format mismatch: ${outName} was given as the ${outNameDescription}, but --image-format=${cliFlag} was passed. The image formats must match.`);
        }
        return { format: outNameExtension, source: 'Out name extension' };
    }
    if (cliFlag === 'none') {
        throw new TypeError('The --image-format flag must not be "none" for stills.');
    }
    if (cliFlag !== null) {
        return { format: cliFlag, source: '--image-format flag' };
    }
    if (configImageFormat !== null) {
        // @ts-expect-error
        if (configImageFormat === 'none') {
            throw new Error('The still simage format in the config file must not be "none"');
        }
        return { format: configImageFormat, source: 'Config file' };
    }
    return { format: 'png', source: 'Default' };
};
exports.determineFinalStillImageFormat = determineFinalStillImageFormat;
