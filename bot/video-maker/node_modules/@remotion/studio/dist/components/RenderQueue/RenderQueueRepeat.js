"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderQueueRepeatItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const mobile_layout_1 = require("../../helpers/mobile-layout");
const retry_payload_1 = require("../../helpers/retry-payload");
const modals_1 = require("../../state/modals");
const sidebar_1 = require("../../state/sidebar");
const InlineAction_1 = require("../InlineAction");
const RenderQueueRepeatItem = ({ job }) => {
    const { setSelectedModal } = (0, react_1.useContext)(modals_1.ModalsContext);
    const isMobileLayout = (0, mobile_layout_1.useMobileLayout)();
    const { setSidebarCollapsedState } = (0, react_1.useContext)(sidebar_1.SidebarContext);
    const onClick = (0, react_1.useCallback)((e) => {
        e.stopPropagation();
        const retryPayload = (0, retry_payload_1.makeRetryPayload)(job);
        setSelectedModal(retryPayload);
        if (isMobileLayout) {
            setSidebarCollapsedState({ left: 'collapsed', right: 'collapsed' });
        }
    }, [isMobileLayout, job, setSelectedModal, setSidebarCollapsedState]);
    const icon = (0, react_1.useMemo)(() => {
        return {
            height: 12,
            color: 'currentColor',
        };
    }, []);
    const renderAction = (0, react_1.useCallback)((color) => {
        return ((0, jsx_runtime_1.jsx)("svg", { style: icon, viewBox: "0 0 512 512", children: (0, jsx_runtime_1.jsx)("path", { fill: color, d: "M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z" }) }));
    }, [icon]);
    return (0, jsx_runtime_1.jsx)(InlineAction_1.InlineAction, { onClick: onClick, renderAction: renderAction });
};
exports.RenderQueueRepeatItem = RenderQueueRepeatItem;
