"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRenderModalWarnings = exports.defaultTypeCanSaveState = void 0;
const no_react_1 = require("remotion/no-react");
exports.defaultTypeCanSaveState = {
    canUpdate: false,
    reason: 'Loading...',
    determined: false,
};
const getInputPropsWarning = ({ cliProps, propsEditType, }) => {
    if (Object.keys(cliProps).length > 0 &&
        propsEditType === 'default-props') {
        return 'The data that was passed using --props takes priority over the data you enter here.';
    }
    return null;
};
const getCannotSaveDefaultProps = (canSaveDefaultProps) => {
    if (canSaveDefaultProps.canUpdate) {
        return null;
    }
    if (!canSaveDefaultProps.determined) {
        return null;
    }
    return `Can't save default props: ${canSaveDefaultProps.reason}.`;
};
const customDateUsed = (used, inJSONEditor) => {
    if (used && inJSONEditor) {
        return 'There is a Date in the schema which was serialized. Note the custom syntax.';
    }
    return null;
};
const staticFileUsed = (used, inJSONEditor) => {
    if (used && inJSONEditor) {
        return 'There is a staticFile() in the schema which was serialized. Note the custom syntax.';
    }
    return null;
};
const mapUsed = (used, inJSONEditor) => {
    if (used && inJSONEditor) {
        return 'A `Map` was used in the schema which can not be serialized to JSON.';
    }
    return null;
};
const setUsed = (used, inJSONEditor) => {
    if (used && inJSONEditor) {
        return 'A `Set` was used in the schema which can not be serialized to JSON.';
    }
    return null;
};
const getRenderModalWarnings = ({ cliProps, canSaveDefaultProps, isCustomDateUsed, customFileUsed, jsMapUsed, jsSetUsed, inJSONEditor, propsEditType, }) => {
    return [
        getInputPropsWarning({ cliProps, propsEditType }),
        getCannotSaveDefaultProps(canSaveDefaultProps),
        customDateUsed(isCustomDateUsed, inJSONEditor),
        staticFileUsed(customFileUsed, inJSONEditor),
        mapUsed(jsMapUsed, inJSONEditor),
        setUsed(jsSetUsed, inJSONEditor),
    ].filter(no_react_1.NoReactInternals.truthy);
};
exports.getRenderModalWarnings = getRenderModalWarnings;
