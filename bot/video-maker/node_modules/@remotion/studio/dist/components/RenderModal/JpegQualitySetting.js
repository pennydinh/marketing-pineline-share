"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JpegQualitySetting = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const NumberSetting_1 = require("./NumberSetting");
const MIN_JPEG_QUALITY = 1;
const MAX_JPEG_QUALITY = 100;
const JpegQualitySetting = ({ jpegQuality, setJpegQuality }) => {
    return ((0, jsx_runtime_1.jsx)(NumberSetting_1.NumberSetting, { min: MIN_JPEG_QUALITY, max: MAX_JPEG_QUALITY, step: 1, name: "JPEG Quality", onValueChanged: setJpegQuality, value: jpegQuality, hint: 'jpegQualityOption' }));
};
exports.JpegQualitySetting = JpegQualitySetting;
