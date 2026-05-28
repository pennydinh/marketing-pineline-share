"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendersTab = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const colors_1 = require("../helpers/colors");
const context_1 = require("./RenderQueue/context");
const Tabs_1 = require("./Tabs");
const layout_1 = require("./layout");
const row = {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 14,
    color: 'inherit',
    alignItems: 'center',
    flex: 1,
};
const badge = {
    height: 16,
    width: 16,
    borderRadius: 3,
    fontSize: 10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
};
const RendersTab = ({ selected, onClick }) => {
    const { jobs } = (0, react_1.useContext)(context_1.RenderQueueContext);
    const { canvasContent } = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const failedJobs = jobs.filter((j) => j.status === 'failed').length;
    const jobCount = jobs.length;
    const isActuallySelected = (0, react_1.useMemo)(() => {
        if (!canvasContent || canvasContent.type !== 'composition') {
            return true;
        }
        return selected;
    }, [canvasContent, selected]);
    const badgeStyle = (0, react_1.useMemo)(() => {
        return {
            ...badge,
            backgroundColor: failedJobs > 0 ? colors_1.FAIL_COLOR : 'transparent',
            color: failedJobs > 0 ? 'white' : colors_1.LIGHT_TEXT,
            borderWidth: failedJobs > 0 ? 0 : 1,
            borderStyle: 'solid',
            borderColor: colors_1.LIGHT_TEXT,
        };
    }, [failedJobs]);
    return ((0, jsx_runtime_1.jsx)(Tabs_1.Tab, { selected: isActuallySelected, onClick: onClick, children: (0, jsx_runtime_1.jsxs)("div", { style: row, children: ["Renders", jobCount > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(layout_1.Flex, {}), (0, jsx_runtime_1.jsx)("div", { style: badgeStyle, children: jobCount })] })) : null] }) }));
};
exports.RendersTab = RendersTab;
