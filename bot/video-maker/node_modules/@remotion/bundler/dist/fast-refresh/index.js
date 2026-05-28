"use strict";
/**
 * Source code is adapted from https://github.com/WebHotelier/webpack-fast-refresh#readme and rewritten in Typescript. This file is MIT licensed.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactFreshWebpackPlugin = void 0;
const webpack_1 = require("webpack");
class ReactRefreshRuntimeModule extends webpack_1.RuntimeModule {
    constructor() {
        super('react refresh', 5);
    }
    generate() {
        const { runtimeTemplate } = this.compilation;
        return webpack_1.Template.asString([
            `${webpack_1.RuntimeGlobals.interceptModuleExecution}.push(${runtimeTemplate.basicFunction('options', [
                `const originalFactory = options.factory;`,
                `options.factory = ${runtimeTemplate.basicFunction('moduleObject, moduleExports, webpackRequire', [
                    // Legacy CSS implementations will `eval` browser code in a Node.js
                    // context to extract CSS. For backwards compatibility, we need to check
                    // we're in a browser context before continuing.
                    `const hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;`,
                    `const cleanup = hasRefresh ? self.$RefreshInterceptModuleExecution$(moduleObject.id) : () => {};`,
                    'try {',
                    webpack_1.Template.indent('originalFactory.call(this, moduleObject, moduleExports, webpackRequire);'),
                    '} finally {',
                    webpack_1.Template.indent(`cleanup();`),
                    '}',
                ])}`,
            ])})`,
        ]);
    }
}
class ReactFreshWebpackPlugin {
    apply(compiler) {
        const webpackMajorVersion = parseInt(webpack_1.version !== null && webpack_1.version !== void 0 ? webpack_1.version : '', 10);
        if (webpackMajorVersion < 5) {
            throw new Error(`ReactFreshWebpackPlugin does not support webpack v${webpackMajorVersion}.`);
        }
        compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
            compilation.mainTemplate.hooks.localVars.tap(this.constructor.name, (source) => webpack_1.Template.asString([
                source,
                '',
                '// noop fns to prevent runtime errors during initialization',
                'if (typeof self !== "undefined") {',
                webpack_1.Template.indent('self.$RefreshReg$ = function () {};'),
                webpack_1.Template.indent('self.$RefreshSig$ = function () {'),
                webpack_1.Template.indent(webpack_1.Template.indent('return function (type) {')),
                webpack_1.Template.indent(webpack_1.Template.indent(webpack_1.Template.indent('return type;'))),
                webpack_1.Template.indent(webpack_1.Template.indent('};')),
                webpack_1.Template.indent('};'),
                '}',
            ]));
            compilation.hooks.additionalTreeRuntimeRequirements.tap(this.constructor.name, (chunk) => {
                compilation.addRuntimeModule(chunk, new ReactRefreshRuntimeModule());
            });
        });
    }
}
exports.ReactFreshWebpackPlugin = ReactFreshWebpackPlugin;
