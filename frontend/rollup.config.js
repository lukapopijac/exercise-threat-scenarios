import resolve from '@rollup/plugin-node-resolve';  // for importing from node_modules
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';      // for minification
// import url from '@rollup/plugin-url';               // for importing image files
// import { string } from 'rollup-plugin-string';      // for importing css file to string
import css from 'rollup-plugin-css-only';
// import serve from 'rollup-plugin-serve';            // for running local server
import babel from '@rollup/plugin-babel';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import fs from 'fs';
import path from 'path';


const prod = process.env.NODE_ENV == 'production';
let outDir = prod ? 'build' : 'dist';


export default [
	{
		input: ['src/main.js'],
		output: {
			dir: outDir,
			format: 'esm',
			sourcemap: !prod
		},
		plugins: [
			css({output: path.join(outDir, 'bundle.css')}),
			// string({include: ['**/*.css', '**/*.svg']}),
			// url({exclude: '**/*.svg'}),
			// copyAndWatch('src/index.html', 'index.html'),
			babel({
				exclude: 'node_modules/**',
				babelHelpers: 'bundled',
				skipPreflightCheck: true,
				compact: false,
			}),
			replace({
				'process.env.NODE_ENV': prod ? '"production"' : '"development"'
			}),
			resolve(),
			commonjs({
				// dynamicRequireTargets: ['node_modules/@material-ui/data-grid/dist/index-esm.js']
				// transformMixedEsModules: true
			}),
			// getBabelOutputPlugin({
			// 	presets: ['@babel/preset-env']
			// }),
			prod && terser(),
			// !prod && serve({
			// 	contentBase: [outDir],
			// 	host: '0.0.0.0'
			// }),
		]
	}
];



// rollup plugin that copies and watches given file
function copyAndWatch(input, output) {
	return {
		name: 'copy-and-watch',
		async buildStart() {
			this.addWatchFile(input);
		},
		async generateBundle() {
			this.emitFile({
				type: 'asset',
				fileName: output,
				source: fs.readFileSync(input)
			});
		}
	}
}
