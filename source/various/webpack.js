module.exports = {
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['stage-0', 'es2015', 'react']
				}
			}
		]
	}
};
