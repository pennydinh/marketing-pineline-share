"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderQueueError = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const modals_1 = require("../../state/modals");
const z_index_1 = require("../../state/z-index");
const item_style_1 = require("./item-style");
const outputLocation = {
    ...item_style_1.renderQueueItemSubtitleStyle,
};
const RenderQueueError = ({ job }) => {
    const { setSelectedModal } = (0, react_1.useContext)(modals_1.ModalsContext);
    const { tabIndex } = (0, z_index_1.useZIndex)();
    const onClick = (0, react_1.useCallback)(() => {
        setSelectedModal({
            type: 'render-progress',
            jobId: job.id,
        });
    }, [job.id, setSelectedModal]);
    if (job.status !== 'failed') {
        throw new Error('should not have rendered this component');
    }
    return ((0, jsx_runtime_1.jsx)("button", { onClick: onClick, type: "button", style: outputLocation, tabIndex: tabIndex, title: job.error.message, children: job.error.message }));
};
exports.RenderQueueError = RenderQueueError;
