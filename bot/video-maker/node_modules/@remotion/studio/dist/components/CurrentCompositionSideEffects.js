"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentCompositionKeybindings = exports.TitleUpdater = void 0;
const react_1 = require("react");
const remotion_1 = require("remotion");
const client_id_1 = require("../helpers/client-id");
const document_title_1 = require("../helpers/document-title");
const use_keybinding_1 = require("../helpers/use-keybinding");
const NotificationCenter_1 = require("./Notifications/NotificationCenter");
const context_1 = require("./RenderQueue/context");
const TitleUpdater = () => {
    const renderQueue = (0, react_1.useContext)(context_1.RenderQueueContext);
    const { canvasContent } = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const { jobs } = renderQueue;
    (0, react_1.useEffect)(() => {
        if (!canvasContent) {
            (0, document_title_1.setCurrentCanvasContentId)(null);
            return;
        }
        if (canvasContent.type === 'composition') {
            (0, document_title_1.setCurrentCanvasContentId)(canvasContent.compositionId);
            return;
        }
        if (canvasContent.type === 'output') {
            (0, document_title_1.setCurrentCanvasContentId)(canvasContent.path);
            return;
        }
        (0, document_title_1.setCurrentCanvasContentId)(canvasContent.asset);
    }, [canvasContent]);
    (0, react_1.useEffect)(() => {
        (0, document_title_1.setRenderJobs)(jobs);
    }, [jobs]);
    return null;
};
exports.TitleUpdater = TitleUpdater;
const CurrentCompositionKeybindings = ({ readOnlyStudio }) => {
    const keybindings = (0, use_keybinding_1.useKeybinding)();
    const video = remotion_1.Internals.useVideo();
    const { type } = (0, react_1.useContext)(client_id_1.StudioServerConnectionCtx).previewServerState;
    const openRenderModal = (0, react_1.useCallback)(() => {
        if (!video) {
            return;
        }
        if (readOnlyStudio) {
            return (0, NotificationCenter_1.showNotification)('Studio is read-only', 2000);
        }
        if (type !== 'connected') {
            (0, NotificationCenter_1.showNotification)('Studio server is offline', 2000);
            return;
        }
        const renderButton = document.getElementById('render-modal-button');
        renderButton.click();
    }, [readOnlyStudio, type, video]);
    (0, react_1.useEffect)(() => {
        const binding = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'r',
            commandCtrlKey: false,
            callback: openRenderModal,
            preventDefault: true,
            triggerIfInputFieldFocused: false,
            keepRegisteredWhenNotHighestContext: false,
        });
        return () => {
            binding.unregister();
        };
    }, [keybindings, openRenderModal]);
    return null;
};
exports.CurrentCompositionKeybindings = CurrentCompositionKeybindings;
