module.exports = {
	entry: './src/main.js',
	output: {
		path: './bin',
		filename: 'bundle.js'
	},
	devtool: 'eval-source-map',
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	},
	devServer: {
		contentBase: 'public'
	}
};