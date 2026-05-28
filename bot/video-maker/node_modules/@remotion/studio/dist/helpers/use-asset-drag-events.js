"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const no_react_1 = require("remotion/no-react");
function useAssetDragEvents({ name, parentFolder, dropLocation, setDropLocation, }) {
    const dragDepthRef = (0, react_1.useRef)(0);
    const combinedParents = (0, react_1.useMemo)(() => {
        return [parentFolder, name].filter(no_react_1.NoReactInternals.truthy).join('/');
    }, [name, parentFolder]);
    const isDropDiv = (0, react_1.useMemo)(() => {
        return dropLocation === combinedParents;
    }, [combinedParents, dropLocation]);
    const onDragEnter = (0, react_1.useCallback)(() => {
        if (dragDepthRef.current === 0) {
            setDropLocation((currentDropLocation) => (currentDropLocation === null || currentDropLocation === void 0 ? void 0 : currentDropLocation.includes(combinedParents))
                ? currentDropLocation
                : combinedParents);
        }
        dragDepthRef.current++;
    }, [combinedParents, dragDepthRef, setDropLocation]);
    const onDragLeave = (0, react_1.useCallback)(() => {
        dragDepthRef.current--;
        if (dragDepthRef.current === 0) {
            setDropLocation((currentPath) => currentPath === combinedParents ? parentFolder : currentPath);
        }
    }, [combinedParents, dragDepthRef, parentFolder, setDropLocation]);
    (0, react_1.useEffect)(() => {
        if (dropLocation === null) {
            dragDepthRef.current = 0;
        }
    }, [dropLocation]);
    return {
        isDropDiv,
        onDragEnter,
        onDragLeave,
    };
}
exports.default = useAssetDragEvents;
