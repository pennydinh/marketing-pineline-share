"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFileExistence = void 0;
const react_1 = require("react");
const actions_1 = require("../components/RenderQueue/actions");
const client_id_1 = require("./client-id");
const useFileExistence = (outName) => {
    const [exists, setExists] = (0, react_1.useState)(false);
    const { previewServerState: state, subscribeToEvent } = (0, react_1.useContext)(client_id_1.StudioServerConnectionCtx);
    const clientId = state.type === 'connected' ? state.clientId : undefined;
    const currentOutName = (0, react_1.useRef)('');
    currentOutName.current = outName;
    (0, react_1.useEffect)(() => {
        if (!clientId) {
            return;
        }
        (0, actions_1.subscribeToFileExistenceWatcher)({
            file: outName,
            clientId,
        }).then((_exists) => {
            if (currentOutName.current === outName) {
                setExists(_exists);
            }
        });
        return () => {
            (0, actions_1.unsubscribeFromFileExistenceWatcher)({ file: outName, clientId });
        };
    }, [clientId, outName]);
    (0, react_1.useEffect)(() => {
        const listener = (event) => {
            if (event.type !== 'watched-file-deleted') {
                return;
            }
            if (event.file !== currentOutName.current) {
                return;
            }
            if (currentOutName.current === outName) {
                setExists(false);
            }
        };
        const unsub = subscribeToEvent('watched-file-deleted', listener);
        return () => {
            unsub();
        };
    }, [outName, subscribeToEvent]);
    (0, react_1.useEffect)(() => {
        const listener = (event) => {
            if (event.type !== 'watched-file-undeleted') {
                return;
            }
            if (event.file !== outName) {
                return;
            }
            if (currentOutName.current === outName) {
                setExists(true);
            }
        };
        const unsub = subscribeToEvent('watched-file-undeleted', listener);
        return () => {
            unsub();
        };
    }, [outName, subscribeToEvent]);
    return exists;
};
exports.useFileExistence = useFileExistence;
