var path = require('path');

module.exports = {
	entry: {
		index: './src/main.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: './dist/',
		filename: '[name].bundle.js'
	},
	externals: {
		'react': 'React'
	},
	module: {
		loaders: [
			{
				test: /\.js$/, 
				loader: "jsx!babel",
				include: /src/
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.(jpg|png)$/,
				loader: 'file-loader?name=image/[hash:8].[name].[ext]'
			},
		    {
		      	test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		      	loader: "file-loader?name=fonts/[hash:8].[name].[ext]"
		    }
		]
	}
}