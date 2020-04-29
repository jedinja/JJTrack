const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	//cache: false,
	entry: {
		app: ["./src/js/app.js"],
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0'],
					plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
				},
			},
			{
				test: /\.scss$/, exclude: /(node_modules)/,
				loader: ExtractTextPlugin.extract('css-loader!sass-loader')},
			{
				test: /\.(jpe?g|gif|png)$/,
				loader: "file-loader",
			},
			{
				test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&minetype=application/font-woff',
			},
			{
				test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&minetype=application/font-woff2',
			},
			{
				test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&minetype=application/x-font-truetype',
			},
			{
				test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&minetype=image/svg+xml',
			},
			{
				test: /\.otf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&minetype=application/x-font-opentype',
			},
			{
				test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=1000000&minetype=application/vnd.ms-fontobject',
			},
			{
				test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
			},
		],
	},
	output: {
		path: path.resolve(__dirname, 'dist/'),
		filename: "app.js",
		publicPath: '/',
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new ExtractTextPlugin("styles.css"),
		new HtmlWebpackPlugin({
			hash: true,
			template: './src/resources/index.template.ejs',
			inject: 'body',
		}),
		new CopyWebpackPlugin([
			{
				context: './src/resources/images',
				from: '**/*',
				to: "./images",
			},
		]),
	],
};
