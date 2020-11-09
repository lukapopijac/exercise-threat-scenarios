const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	watch: true,
	entry: './src/main.js',
	devServer: {
		hot: false,
		liveReload: false,
		inline: false,
		writeToDisk: true
	},
	output: {
		filename: 'bundle.js'
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
