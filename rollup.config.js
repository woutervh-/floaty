import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

// TODO:
// Look at: https://medium.com/js-imaginea/comparing-bundlers-webpack-rollup-parcel-f8f5dc609cfd

const plugins = [resolve()];

if (process.env.ROLLUP_UGLIFY === 'true') {
    plugins.push(uglify());
}

export default {
    input: 'lib/es6/index.js',
    output: {
        name: 'Floaty',
        format: 'umd',
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        },
        exports: 'named'
    },
    external: ['react', 'react-dom'],
    plugins
};
