module.exports = {
  mode: 'production',
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
	  rules: [
      { 
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
	  ]
	}
};
