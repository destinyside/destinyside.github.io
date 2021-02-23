const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const url = require('url')
const publicPath = ''
//var nodeExternals = require('webpack-node-externals');

module.exports = (options = {}) => ({
  target: 'web',
  //externals: [nodeExternals()],
  mode: options.dev ? 'development': 'production',
  entry: {
    vendor: './src/vendor',
    index: './src/main.js'
  },
  output: {
    path: resolve(__dirname, 'docs'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
	test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        },
        include: [resolve('src')],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
	new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                //打包重复出现的代码
                vendor: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    //name: 'vendor'
                },
                //打包第三方类库
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: Infinity
                }
            }
        }),
        new webpack.optimize.RuntimeChunkPlugin({
            name: "manifest"
        }),
    	new HtmlWebpackPlugin({
      		template: 'src/index.html'
    	}),
	new VueLoaderPlugin(),
	new webpack.ProvidePlugin({
            process: 'process/browser'
        })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    },
    fallback: {
      fs: false
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  devServer: {
    host: '0.0.0.0',
    port: 8010,
    proxy: {
      '/api/': {
        target: 'http://0.0.0.0:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  devtool: options.dev ? 'eval-source-map' : 'source-map'
})
