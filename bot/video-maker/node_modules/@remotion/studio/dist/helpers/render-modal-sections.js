"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRenderModalSections = void 0;
const react_1 = require("react");
const useRenderModalSections = (renderMode, codec) => {
    const [selectedTab, setTab] = (0, react_1.useState)('general');
    const shownTabs = (0, react_1.useMemo)(() => {
        if (renderMode === 'audio') {
            return ['general', 'data', 'audio', 'advanced'];
        }
        if (renderMode === 'still') {
            return ['general', 'data', 'picture', 'advanced'];
        }
        if (renderMode === 'sequence') {
            return ['general', 'data', 'picture', 'advanced'];
        }
        if (renderMode === 'video') {
            if (codec === 'gif') {
                return ['general', 'data', 'picture', 'gif', 'advanced'];
            }
            return ['general', 'data', 'picture', 'audio', 'advanced'];
        }
        throw new TypeError('Unknown render mode');
    }, [codec, renderMode]);
    const tab = (0, react_1.useMemo)(() => {
        if (!shownTabs.includes(selectedTab)) {
            return shownTabs[0];
        }
        return selectedTab;
    }, [selectedTab, shownTabs]);
    return (0, react_1.useMemo)(() => {
        return { tab, setTab, shownTabs };
    }, [tab, shownTabs]);
};
exports.useRenderModalSections = useRenderModalSections;
