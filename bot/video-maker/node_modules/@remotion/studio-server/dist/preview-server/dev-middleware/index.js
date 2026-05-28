"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wdm = void 0;
const middleware_1 = require("./middleware");
const setup_hooks_1 = require("./setup-hooks");
const setup_output_filesystem_1 = require("./setup-output-filesystem");
const wdm = (compiler, logLevel) => {
    const context = {
        state: false,
        stats: undefined,
        callbacks: [],
        compiler,
        logger: compiler.getInfrastructureLogger('remotion'),
        outputFileSystem: undefined,
    };
    (0, setup_hooks_1.setupHooks)(context, logLevel);
    (0, setup_output_filesystem_1.setupOutputFileSystem)(context);
    const errorHandler = (error) => {
        if (error) {
            context.logger.error(error);
        }
    };
    const watchOptions = context.compiler.options.watchOptions || {};
    context.compiler.watch(watchOptions, errorHandler);
    return (0, middleware_1.middleware)(context);
};
exports.wdm = wdm;
