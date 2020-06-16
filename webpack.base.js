/*
 * @Description: webpack配置文件
 * @Author: 朱凯凯（1965581681@qq.com）
 * @Date: 2020-06-16 11:39:40
 */


const path = require('path'); //Node.js 核心模块，用于操作文件路径。
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  //入口起点,该模块来作为构建其内部依赖图的开始。
  entry: './src/index.js',
  //出口，在path路径下生成 filename文件
  output: {
    filename: 'bundle.js', //filename 用于输出文件的文件名。
    path: path.resolve(__dirname, 'dist'), // 目标输出目录 path 的绝对路径，硬盘中位置
    publicPath: //输出解析文件的目录，指定资源文件引用的目录 ，打包后浏览器访问服务时的 url 路径中通用的一部分。
  },
  //inline-source-map 内联错误映射
  devtool: 'inline-source-map',
  //webpack-dev-server 提供了一个简单的web服务器
  devServer: {
    contentBase: './dist',
    hot: true, //启动热加载
    host: 'localhost' //域名
  },
  //loader，test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。use 属性，表示进行转换时，应该使用哪个 loader。
  module: {
    rules: [
      //加载css样式模块，npm install --save-dev style-loader css-loader
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      //加载图片，npm install --save-dev file-loader
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      //加载字体，
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      //加载数据模块，npm install --save-dev csv-loader xml-loader
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      },

    ]
  },
  //插件
  plugins: [
    // 简单创建 HTML 文件，用于服务器访问
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    //清理 dist 文件插件
    new CleanWebpackPlugin(['dist']),
    //启用模块热替换
    new webpack.NamedModulesPlugin(), //用于启动HMR时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(), //hot module replacement 启动模块热替换的插件
  ],

  //模式,通过选择 development 或 production 之中的一个，来设置 mode 参数，可以启用相应模式下的 webpack 内置的优化
  mode: "production"
};

/**
 * 多入口模式，多用于设置多页面应用
 */
entry: {
  app: './src/app.js',
  vendors: './src/vendors.js'
}
output: {
  filename: '[name].js',
  path: __dirname + '/dist'
}

