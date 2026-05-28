"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaths = void 0;
function getPaths(context) {
    const { stats } = context;
    const publicPaths = [];
    if (!stats) {
        return publicPaths;
    }
    const { compilation } = stats;
    // The `output.path` is always present and always absolute
    const outputPath = compilation.getPath(compilation.outputOptions.path || '');
    const publicPath = compilation.outputOptions.publicPath
        ? compilation.getPath(compilation.outputOptions.publicPath)
        : '';
    publicPaths.push({ outputPath, publicPath });
    return publicPaths;
}
exports.getPaths = getPaths;
