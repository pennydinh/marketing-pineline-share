"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderModalEnvironmentVariables = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const Button_1 = require("../Button");
const layout_1 = require("../layout");
const EnvInput_1 = require("./EnvInput");
const title = {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors_1.LIGHT_TEXT,
    marginLeft: 16,
};
const container = {
    marginTop: 20,
};
const button = {
    marginLeft: 16,
};
const RenderModalEnvironmentVariables = ({ envVariables, setEnvVariables }) => {
    const onEnvValChange = (0, react_1.useCallback)((index, value) => {
        setEnvVariables((oldEnv) => {
            const newEnv = [...oldEnv];
            newEnv[index][1] = value;
            return newEnv;
        });
    }, [setEnvVariables]);
    const onEnvKeyChange = (0, react_1.useCallback)((index, value) => {
        setEnvVariables((oldEnv) => {
            const newEnv = [...oldEnv];
            newEnv[index][0] = value;
            return newEnv;
        });
    }, [setEnvVariables]);
    const onDelete = (0, react_1.useCallback)((index) => {
        setEnvVariables((oldEnv) => oldEnv.filter((_, idx) => idx !== index));
    }, [setEnvVariables]);
    const addField = (0, react_1.useCallback)(() => {
        setEnvVariables((oldEnv) => [...oldEnv, ['', '']]);
    }, [setEnvVariables]);
    const usedKeys = [];
    return ((0, jsx_runtime_1.jsxs)("div", { style: container, children: [(0, jsx_runtime_1.jsx)("strong", { style: title, children: "Environment variables" }), envVariables.map((env, i) => {
                let isDuplicate = false;
                if (usedKeys.includes(env[0].toUpperCase())) {
                    isDuplicate = true;
                }
                usedKeys.push(env[0].toUpperCase());
                return ((0, jsx_runtime_1.jsx)(EnvInput_1.EnvInput
                // eslint-disable-next-line react/no-array-index-key
                , { onEnvKeyChange: onEnvKeyChange, onEnvValChange: onEnvValChange, envKey: env[0], envVal: env[1], onDelete: onDelete, index: i, isDuplicate: isDuplicate, autoFocus: i === envVariables.length - 1 && env[0] === '' }, i));
            }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { y: 1, block: true }), (0, jsx_runtime_1.jsx)(Button_1.Button, { style: button, onClick: addField, children: "+ Add env variable" }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { y: 1, block: true })] }));
};
exports.RenderModalEnvironmentVariables = RenderModalEnvironmentVariables;
