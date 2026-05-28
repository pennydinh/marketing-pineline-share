"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jpegQualityOption = exports.getJpegQuality = exports.setJpegQuality = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const jpeg_quality_1 = require("../jpeg-quality");
const defaultValue = jpeg_quality_1.DEFAULT_JPEG_QUALITY;
let quality = defaultValue;
const setJpegQuality = (q) => {
    (0, jpeg_quality_1.validateJpegQuality)(q);
    if (q === 0 || q === undefined) {
        quality = defaultValue;
        return;
    }
    quality = q;
};
exports.setJpegQuality = setJpegQuality;
const getJpegQuality = () => quality;
exports.getJpegQuality = getJpegQuality;
const cliFlag = 'jpeg-quality';
exports.jpegQualityOption = {
    name: 'JPEG Quality',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Sets the quality of the generated JPEG images. Must be an integer between 0 and 100. Default: 80." })),
    ssrName: 'jpegQuality',
    docLink: 'https://www.remotion.dev/docs/renderer/render-media#jpeg-quality',
    type: 0,
    setConfig: exports.setJpegQuality,
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            (0, jpeg_quality_1.validateJpegQuality)(commandLine[cliFlag]);
            return {
                source: 'cli',
                value: commandLine[cliFlag],
            };
        }
        if (quality !== defaultValue) {
            return {
                source: 'config',
                value: quality,
            };
        }
        return {
            source: 'default',
            value: defaultValue,
        };
    },
};
