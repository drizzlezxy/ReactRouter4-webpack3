var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HappyPack = require('happypack');
var path = require('path');
var defaultSettings = require('./defaults');
var filePath = defaultSettings.filePath;

const extractLESS = new ExtractTextPlugin('less.[name].[hash].css', { disable: false, allChunks : true });
const extractSASS = new ExtractTextPlugin('sass.[name].[hash].css', { disable: false, allChunks : true });
const extractCSS = new ExtractTextPlugin('css.[name].[hash].css', { disable: false, allChunks : true });

var webpackConfig = {
  entry: {
    vendor: ['react', 'react-dom', 'jquery', 'babel-polyfill'],
    app: defaultSettings.filePath.srcPath + '/index.jsx',
  },
  output: {
    path: filePath.build,
    filename: '[name].[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/'
  },
  devtool: false,
  cache: false,
  resolve: {
    extensions: ['.js', '.jsx'],    // 文件扩展名自动填充为 js 或 jsx
    alias: {
      'components': path.join(__dirname, '../src/javascript/components'),
      'page':       path.join(__dirname, '../src/javascript/page'),
      'extend':     path.join(__dirname, '../src/javascript/extend'),
      'constants':  path.join(__dirname, '../src/javascript/extend/constants'),
      'scss':       path.join(__dirname, '../src/scss'),
      'states':     path.join(__dirname, '../src/javascript/states'),
      'pages':      path.join(__dirname, '../src/jipei-statementsPages'),
      'src':        path.join(__dirname, '../src'),
      'images':     path.join(__dirname, '../res/images'),
      'data':       path.join(__dirname, '../src/javascript/data'),
      'fonts':      path.join(__dirname, '../res/fonts'),
      'jquery':     path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js'),
    }
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=jsx',
      }, {

      //   test: /\.less$/,
      //   loader: 'style-loader!css-loader!less-loader?{"modifyVars":{"primary-color":"#F8CF00","heading-color":"fade(#000, 100%)","text-color":"fade(#000, 85%)","text-color-secondary":"fade(#000, 65%)"}}'
      // }, {
      //   test: /\.scss/,
      //   loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=compressed',
      // }, {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader!postcss-loader'
      // }, {
        
        test: /\.less$/,
        use: extractLESS.extract({
          use: [
            {
              loader: 'css-loader',
            }, {
              loader: 'less-loader',
              options: {
                modifyVars: {
                  "primary-color": "#F8CF00",
                  "heading-color": "fade(#000, 100%)",
                  "text-color": "fade(#000, 85%)",
                  "text-color-secondary": "fade(#000, 65%)",
                },
              },
            },
          ],
        }),
      }, {
        test: /\.scss$/,
        use: extractSASS.extract({
          use: [
            {
              loader: 'css-loader',
            // }, {
              // loader: 'postcss-loader',
            }, {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed',
              },
            },
          ],
        }),
      }, {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'postcss-loader',
            }, {
              loader: 'css-loader',
            },
          ],
        })
      }, {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader?limit=1&name=res/[name].[hash].[ext]'
      }, {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'jsx',
      loaders: [ 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0&presets[]=stage-1&presets[]=stage-3' ]
    }),
    extractSASS,
    extractLESS,
    extractCSS,
    new webpack.optimize.ModuleConcatenationPlugin(),   // webpack 3.0, 作用域提升, 让打包出来的代码更小、运行的更快
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.[hash].js",
      chunks: defaultSettings.chunks
    }),

    // new webpack.optimize.UglifyJsPlugin({
    //   parallel: true,     // 多进程压缩, 加速
    //   sourceMap: false,
    //   uglifyOptions: {
    //     mangle: {
    //       reserved: ['$super', '$', 'exports', 'require']     // 不丑化
    //     },
    //     output: {
    //       comments: false,    // 不保留注释
    //     },
    //     compress: {
    //       warnings: false,
    //       drop_console: true,   // 丢弃console.*语句
    //       pure_funcs: ['console.log'],    // 丢弃conso.log语句前检测其是否会产生任何副作用（压缩将会更慢）
    //     },
    //     warnings: false,
    //   },
    // }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
      template : defaultSettings.filePath.srcPath + '/index.html',
      chunks: ['vendor', 'app'],
      // favicon  : project.paths.public('favicon.ico'),
      filename : 'index.html',
      inject   : 'body',
      minify   : {
        removeComments: true,
        collapseWhitespace: false
      }
    })
  ]
};

module.exports = webpackConfig;