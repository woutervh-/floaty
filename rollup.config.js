import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [{
    input: 'lib/es6/index.js',
    output: {
        name: 'Floaty',
        file: pkg.browser,
        format: 'umd',
        sourcemap: true,
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
    },
    external: ['react', 'react-dom'],
    plugins: [resolve()]
}, {
    input: 'lib/es6/index.js',
    output: {
        name: 'Floaty',
        file: pkg['browser.minified'],
        format: 'umd',
        sourcemap: true,
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
    },
    external: ['react', 'react-dom'],
    plugins: [resolve(), terser()]
}];
