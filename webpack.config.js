module.exports = {
  entry: './src/index.js',
  output: {
    filename: './assets/js/bundle.js',
  },
  watch: true,
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
