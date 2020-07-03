import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

// export default {
//     input: 'node_modules/mapbox-gl/dist/mapbox-gl-unminified.js',
//     output: [
//         {
//             file: 'vendor/mapbox-gl.esm.js',
//             format: 'esm',
//             plugins: [commonjs()],
//         },
//         {
//             file: 'vendor/mapbox-gl.esm.min.js',
//             format: 'esm',
//             plugins: [terser(), commonjs()],
//         },
//     ],
// }

export default [
    {
        input: 'node_modules/mapbox-gl/dist/mapbox-gl-unminified.js',
        output: {
            file: 'vendor/mapbox-gl.esm.js',
            format: 'esm',
        },
        plugins: [commonjs()],
    },
    {
        input: 'node_modules/mapbox-gl/dist/mapbox-gl-unminified.js',
        output: {
            file: 'vendor/mapbox-gl.esm.min.js',
            format: 'esm',
        },
        plugins: [terser(), commonjs()],
    },
]
