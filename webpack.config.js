module.exports = {
	entry: {
		screen: './src/screen.js',
		controller: './src/controller.js'
	},
	output: {
		path: './bin',
		filename: '[name].bundle.js'
	},
	devtool: 'eval-source-map',
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
};