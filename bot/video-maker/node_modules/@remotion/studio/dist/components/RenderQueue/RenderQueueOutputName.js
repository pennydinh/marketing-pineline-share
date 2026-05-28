"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderQueueOutputName = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const item_style_1 = require("./item-style");
const RenderQueueOutputName = ({ job }) => {
    const style = (0, react_1.useMemo)(() => {
        return {
            ...item_style_1.renderQueueItemSubtitleStyle,
            textDecoration: job.deletedOutputLocation ? 'line-through' : 'none',
            color: item_style_1.renderQueueItemSubtitleStyle.color,
            cursor: 'inherit',
        };
    }, [job.deletedOutputLocation]);
    return ((0, jsx_runtime_1.jsx)("span", { style: style, title: job.deletedOutputLocation ? 'File was deleted' : job.outName, children: job.outName }));
};
exports.RenderQueueOutputName = RenderQueueOutputName;
