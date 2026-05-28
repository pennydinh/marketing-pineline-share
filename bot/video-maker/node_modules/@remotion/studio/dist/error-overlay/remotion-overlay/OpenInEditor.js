"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenInEditor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Button_1 = require("../../components/Button");
const open_in_editor_1 = require("../../helpers/open-in-editor");
const use_keybinding_1 = require("../../helpers/use-keybinding");
const ShortcutHint_1 = require("./ShortcutHint");
const initialState = { type: 'idle' };
const reducer = (state, action) => {
    if (action.type === 'start') {
        return {
            type: 'load',
        };
    }
    if (action.type === 'fail') {
        return {
            type: 'error',
        };
    }
    if (action.type === 'reset') {
        return {
            type: 'idle',
        };
    }
    if (action.type === 'succeed') {
        return {
            type: 'success',
        };
    }
    return state;
};
const OpenInEditor = ({ stack, canHaveKeyboardShortcuts }) => {
    const isMounted = (0, react_1.useRef)(true);
    const [state, dispatch] = (0, react_1.useReducer)(reducer, initialState);
    const { registerKeybinding } = (0, use_keybinding_1.useKeybinding)();
    const dispatchIfMounted = (0, react_1.useCallback)((payload) => {
        if (isMounted.current === false)
            return;
        dispatch(payload);
    }, []);
    const openInBrowser = (0, react_1.useCallback)(() => {
        dispatch({ type: 'start' });
        (0, open_in_editor_1.openInEditor)(stack)
            .then((res) => res.json())
            .then((data) => {
            if (data.success) {
                dispatchIfMounted({ type: 'succeed' });
            }
            else {
                dispatchIfMounted({ type: 'fail' });
            }
        })
            .catch((err) => {
            dispatchIfMounted({ type: 'fail' });
            console.log('Could not open browser', err);
        })
            .finally(() => {
            setTimeout(() => {
                dispatchIfMounted({ type: 'reset' });
            }, 2000);
        });
    }, [dispatchIfMounted, stack]);
    (0, react_1.useEffect)(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (!canHaveKeyboardShortcuts) {
            return;
        }
        const onEditor = () => {
            openInBrowser();
        };
        const { unregister } = registerKeybinding({
            event: 'keydown',
            key: 'o',
            callback: onEditor,
            commandCtrlKey: true,
            preventDefault: true,
            triggerIfInputFieldFocused: false,
            keepRegisteredWhenNotHighestContext: false,
        });
        return () => unregister();
    }, [canHaveKeyboardShortcuts, openInBrowser, registerKeybinding]);
    const label = (0, react_1.useMemo)(() => {
        switch (state.type) {
            case 'error':
                return 'Failed to open';
            case 'idle':
                return `Open in ${window.remotion_editorName}`;
            case 'success':
                return `Opened in ${window.remotion_editorName}`;
            case 'load':
                return `Opening...`;
            default:
                throw new Error('invalid state');
        }
    }, [state.type]);
    return ((0, jsx_runtime_1.jsxs)(Button_1.Button, { onClick: openInBrowser, disabled: state.type !== 'idle', children: [label, canHaveKeyboardShortcuts ? ((0, jsx_runtime_1.jsx)(ShortcutHint_1.ShortcutHint, { keyToPress: "o", cmdOrCtrl: true })) : null] }));
};
exports.OpenInEditor = OpenInEditor;
