"use strict";
// When Webpack cannot resolve these dependencies, it will not print an error message.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowOptionalDependenciesPlugin = void 0;
const OPTIONAL_DEPENDENCIES = [
    'zod',
    '@remotion/zod-types',
    'react-native-reanimated',
    'react-native-reanimated/package.json',
];
const SOURCE_MAP_IGNORE = ['path', 'fs'];
class AllowOptionalDependenciesPlugin {
    filter(error) {
        for (const dependency of OPTIONAL_DEPENDENCIES) {
            if (error.message.includes(`Can't resolve '${dependency}'`)) {
                return false;
            }
        }
        for (const dependency of SOURCE_MAP_IGNORE) {
            if (error.message.includes(`Can't resolve '${dependency}'`) &&
                error.message.includes('source-map')) {
                return false;
            }
        }
        return true;
    }
    apply(compiler) {
        compiler.hooks.afterCompile.tap('Com', (compilation) => {
            compilation.errors = compilation.errors.filter(this.filter);
        });
        compiler.hooks.afterEmit.tap('AllowOptionalDependenciesPlugin', (compilation) => {
            compilation.errors = compilation.errors.filter(this.filter);
            compilation.warnings = compilation.warnings.filter(this.filter);
        });
    }
}
exports.AllowOptionalDependenciesPlugin = AllowOptionalDependenciesPlugin;
