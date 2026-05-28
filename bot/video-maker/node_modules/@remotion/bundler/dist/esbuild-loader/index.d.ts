import type webpack from 'webpack';
import type { LoaderOptions } from './interfaces';
declare function ESBuildLoader(this: webpack.LoaderContext<LoaderOptions>, source: string): Promise<void>;
export default ESBuildLoader;
