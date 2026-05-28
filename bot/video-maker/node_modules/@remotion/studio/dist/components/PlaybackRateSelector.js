"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaybackRateSelector = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const is_current_selected_still_1 = require("../helpers/is-current-selected-still");
const Checkmark_1 = require("../icons/Checkmark");
const playbackrate_1 = require("../state/playbackrate");
const ControlButton_1 = require("./ControlButton");
const ComboBox_1 = require("./NewComposition/ComboBox");
const commonPlaybackRates = [
    -4, -2, -1, -0.5, -0.25, 0.25, 0.5, 1, 1.5, 2, 4,
];
const getPlaybackRateLabel = (playbackRate) => {
    return `${playbackRate}x`;
};
const accessibilityLabel = 'Change the playback rate';
const comboStyle = { width: 80 };
const PlaybackRateSelector = ({ playbackRate, setPlaybackRate }) => {
    const { canvasContent } = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const isStill = (0, is_current_selected_still_1.useIsStill)();
    const style = (0, react_1.useMemo)(() => {
        return {
            padding: ControlButton_1.CONTROL_BUTTON_PADDING,
        };
    }, []);
    const items = (0, react_1.useMemo)(() => {
        const divider = {
            type: 'divider',
            id: 'divider',
        };
        const values = commonPlaybackRates.map((newPlaybackRate) => {
            return {
                id: String(newPlaybackRate),
                label: getPlaybackRateLabel(newPlaybackRate),
                onClick: () => {
                    return setPlaybackRate(() => {
                        (0, playbackrate_1.persistPlaybackRate)(newPlaybackRate);
                        return newPlaybackRate;
                    });
                },
                type: 'item',
                value: newPlaybackRate,
                keyHint: null,
                leftItem: String(playbackRate) === String(newPlaybackRate) ? ((0, jsx_runtime_1.jsx)(Checkmark_1.Checkmark, {})) : null,
                subMenu: null,
                quickSwitcherLabel: null,
            };
        });
        const middle = Math.floor(commonPlaybackRates.length / 2);
        return [...values.slice(0, middle), divider, ...values.slice(middle)];
    }, [playbackRate, setPlaybackRate]);
    if (isStill || canvasContent === null || canvasContent.type === 'asset') {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { style: style, "aria-label": accessibilityLabel, children: (0, jsx_runtime_1.jsx)(ComboBox_1.Combobox, { title: accessibilityLabel, style: comboStyle, selectedId: String(playbackRate), values: items }) }));
};
exports.PlaybackRateSelector = PlaybackRateSelector;
