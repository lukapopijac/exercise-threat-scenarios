const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'production',
	watch: false,
	entry: './src/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: './src/index.html', to: 'index.html' },
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: false
						}
					}
				]
			}
		]
	}
};
