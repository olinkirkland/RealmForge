const path = require('path');

module.exports = {
  mode: 'development',
  watch: true,
  entry: './src/index.ts',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
    extensions: ['.ts']
  }
};
