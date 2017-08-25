var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var defaultSettings = require('./defaults');
var filePath = defaultSettings.filePath;

var webpackConfig = {
  entry: {
    app: defaultSettings.filePath.srcPath + '/index.jsx',
  },
  output: {
    path: filePath.devbuild,
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: filePath.publicPath
  },
  cache: true,
  devtool: 'inline-source-map',   // 映射代码到其原始位置
  devServer: {
    contentBase: './',
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    publicPath: filePath.publicPath,
    port: defaultSettings.port,
    disableHostCheck: true, // 必须同时设置disableHostCheck host两个属性，
    host: "0.0.0.0",        // 才能用ip代替localhost访问
    openPage: '/Login',
  },
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
    // 如果你确定一个模块中，没有其它新的依赖，就可以配置这项，Webpack将不再扫描这个文件中的依赖
    noParse: [
      path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')
    ],
    rules: [
      // 装载机(loaders)，允许每个子项都可以有以下属性
      // test：    必须满足的条件（正则表达式，不要加引号，匹配要处理的文件）
      // exclude： 不能满足的条件（排除不处理的目录）
      //              三方包，通常它将有src和dist目录。若配置/node_modules/，
      //              则从dist已经编译的目录中获取文件。否则会再次编译它们。
      // include： 导入的文件将由加载程序转换的路径或文件数组（把要处理的目录包括进来）
      // loader：  一串“！”分隔的装载机（2.0版本以上，”-loader”不可以省略）
      // loaders： 作为字符串的装载器阵列
      {
      //   enforce: "pre",
      //   //检测文件类型
      //   test: /\.(js|jsx)$/,
      //   //检测文件位置
      //   include: path.join(__dirname, '../src'),
      //     //使用eslint-loader
      //   use: 'eslint-loader'
      // }, {
        test: /.jsx?$/,
        use: [
          {
            loader: 'react-hot-loader',
          }, {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-0', 'stage-1'],
              cacheDirectory: true,
              // plugins: [require('babel-plugin-transform-object-rest-spread')]
            },
          }, {
            loader: 'webpack-module-hot-accept',
          }
        ],
        exclude: /node_modules/,
      }, {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader?{"modifyVars":{"primary-color":"#F8CF00","heading-color":"fade(#000, 100%)","text-color":"fade(#000, 85%)","text-color-secondary":"fade(#000, 65%)"}}'
      }, {
        test: /\.scss/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=compressed',
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }, {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=1&name=res/[name].[hash:8].[ext]'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css', {
      allChunks : true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
      template : defaultSettings.filePath.srcPath + '/index.html',
      hash     : false,
      // favicon  : project.paths.public('favicon.ico'),
      filename : 'index.html',
      inject   : 'body',
      minify   : {
        collapseWhitespace : true
      }
    })
  ]
};

module.exports = webpackConfig;