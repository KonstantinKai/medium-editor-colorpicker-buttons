const path = require('path');
const webpack = require('webpack');
const merge = require('lodash.merge');
const packageJson = require('./package');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const VERSION = packageJson.version;

const defaults = {
	entry: './src/index',
	output: {
		path: path.resolve(__dirname, 'dist'),
		library: 'MediumEditorColorPickerButtons',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true
				}
			},
			{
				test: /\.styl$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					},
					{
						loader: 'stylus-loader'
					}
				]
			}
		],
		noParse: [/bower_components/]
	},
	resolve: {
		extensions: ['.js', '.styl', '.ts'],
		modules: [
			'node_modules',
			'bower_components'
		],
		descriptionFiles: ['package.json', 'bower.json']
	}
}

module.exports = [
	merge({
		output: {
			filename: 'medium-editor-colorpicker-buttons.js'
		},
		devtool: 'source-map',
		plugins: [
			new webpack.DefinePlugin({
				version: JSON.stringify(VERSION)
			})
		]
	}, defaults),
	merge({
		output: {
			filename: 'medium-editor-colorpicker-buttons.min.js'
		},
		plugins: [
			new webpack.DefinePlugin({
				version: JSON.stringify(VERSION)
			}),
			new UglifyJSPlugin()
		]
	}, defaults)
];