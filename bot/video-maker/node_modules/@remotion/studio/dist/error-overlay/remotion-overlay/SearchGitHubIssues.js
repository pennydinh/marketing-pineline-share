"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchGithubIssues = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Button_1 = require("../../components/Button");
const use_keybinding_1 = require("../../helpers/use-keybinding");
const ShortcutHint_1 = require("./ShortcutHint");
const SearchGithubIssues = ({ message, canHaveKeyboardShortcuts }) => {
    const openInBrowser = (0, react_1.useCallback)(() => {
        window.open(`https://github.com/remotion-dev/remotion/issues?q=${encodeURIComponent(message)}`, '_blank');
    }, [message]);
    const { registerKeybinding } = (0, use_keybinding_1.useKeybinding)();
    (0, react_1.useEffect)(() => {
        if (!canHaveKeyboardShortcuts) {
            return;
        }
        const onEditor = () => {
            openInBrowser();
        };
        const { unregister } = registerKeybinding({
            event: 'keydown',
            key: 'g',
            callback: onEditor,
            commandCtrlKey: true,
            preventDefault: true,
            triggerIfInputFieldFocused: false,
            keepRegisteredWhenNotHighestContext: false,
        });
        return () => unregister();
    }, [canHaveKeyboardShortcuts, openInBrowser, registerKeybinding]);
    return ((0, jsx_runtime_1.jsxs)(Button_1.Button, { onClick: openInBrowser, children: ["Search GitHub Issues", ' ', canHaveKeyboardShortcuts ? ((0, jsx_runtime_1.jsx)(ShortcutHint_1.ShortcutHint, { keyToPress: "g", cmdOrCtrl: true })) : null] }));
};
exports.SearchGithubIssues = SearchGithubIssues;
