const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')


module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    devServer: {
      static: path.join(__dirname, 'dist'),
      port: 8080,
      hot: true,
  },
 
    output:{
        filename:'app.min.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    plugins: [
        new CopyPlugin({
          patterns: [
            { from: 'public' },
          ]
        })
      ],
    resolve: {
        extensions: [ '.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    }
}