"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFfmpegMergeFilter = exports.OUTPUT_FILTER_NAME = void 0;
const truthy_1 = require("./truthy");
exports.OUTPUT_FILTER_NAME = 'outputaudio';
const createFfmpegMergeFilter = ({ inputs, }) => {
    const pads = inputs.map((input, index) => {
        const filters = [
            input.filter.pad_start ? input.filter.pad_start : null,
            input.filter.pad_end ? input.filter.pad_end : null,
            'acopy',
        ];
        return `[${index}:a]${filters.filter(truthy_1.truthy).join(',')}[padded${index}]`;
    });
    return [
        ...pads,
        `${new Array(inputs.length)
            .fill(true)
            .map((_, i) => {
            return `[padded${i}]`;
        })
            .join('')}amix=inputs=${inputs.length}:dropout_transition=0:normalize=0[${exports.OUTPUT_FILTER_NAME}]`,
    ].join(';');
};
exports.createFfmpegMergeFilter = createFfmpegMergeFilter;
