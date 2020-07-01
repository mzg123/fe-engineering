const fs = require('fs');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const Happypack = require("happypack");
const SizePlugin = require('size-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
//const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const Dashboard = require('webpack-dashboard');
const TerserPlugin = require('terser-webpack-plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

//const smp = new SpeedMeasurePlugin();

const Config = require('./baseConfig');
const Helper = require('./webpackHelper');
const CustomPlugin = require('./webpack.custom.plugin');
const webpackConfig = {
  entry: {
  },
  output:{
    path: Config.staticDistPath,
    publicPath: Config.publicPath,
    filename:'[name].[chunkhash:8].js',
  },
  resolve: {
      extensions: ['.js', '.ts', '.json', '.jsx', '.tsx'],
      //modules: [path.resolve(Config.feParentPath, './fe/' + Config.projectName + '/src/comp/BaseReact'), 'node_modules'],
      alias: {
          '@libjs': path.resolve(Config.feParentPath, './' + Config.projectName + '/src/comp/lib/lib.js'),
          '@commjs': path.resolve(Config.feParentPath, './' + Config.projectName + '/src/comp/comm/commJs.js'),
          'zepto': path.resolve(Config.feParentPath, './' + Config.projectName + '/node_modules/webpack-zepto/index.js'),
      },
  },
  optimization: { 
      minimize: true,
      minimizer: [
          // js mini
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            test: /\.js(\?.*)?$/i,
          }),
          // css mini
          new OptimizeCSSPlugin({
              canPrint: true,
              cssProcessor: require('cssnano'),
              assetNameRegExp: /\.optimize\.css$/g,
              cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
          })
      ],
      moduleIds: 'hashed',
      splitChunks: { 
          chunks: 'all',
          // 大于30KB才单独分离成chunk 
          minSize: 30000, 
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          name: true,
          cacheGroups: {
              default: {
                  name: 'comm/comm',
                  priority: -20,
                  minChunks: 2,
                  reuseExistingChunk: true,
              },
        //styles: {
        //  name: 'style/style',
        //  test: /\.(scss|sass|css)$/,
        //  chunks: 'all',
        //  enforce: true,
        //},
              vendors: {
                  name: 'lib/lib',
                  //test: /[\\/]node_modules[\\/]/,
                  test: /[\\/]node_modules[\\/](react|react-dom|immutable)[\\/]/,
                  priority: -10,
                  chunks: "all"
              },
          }
      }
  },
   devServer: {
     inline: true,
     open: true,
     //quiet: true,
     disableHostCheck: true,
     port: Config.devServerPort,
     host: Config.devServerHost,
     publicPath: Config.publicPath,
     proxy: {
         "/activity_square": {
          target: 'http://open-miaozhigao.ba9bytree-dev.com',
          changeOrigin: true,
          secure: false
     },
   },
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude:/node_modules/,
		//use: "happypack/loader?id=js",
	      use: [
		{
		    loader:'babel-loader',
		    options:{
		      cacheDirectory: true,
		      plugins:['@babel/plugin-transform-runtime', ['@babel/plugin-proposal-decorators', { 'legacy': true }]],
		      presets: [['@babel/preset-env',{modules: false}]]
		    },
		}
	      ],
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: [
            /node_modules/,
        ],
        use: "happypack/loader?id=eslint",
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
		  "happypack/loader?id=css",
          {
              loader: "postcss-loader",
              options: {
                  plugins: [
                      require("postcss-import"),
                      require("autoprefixer"), /*在这里添加*/
                  ],
              },
          },
        ]
      }, 
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit:10000,
          outputPath: 'imgs/'
        }
      },
      {
           test: /\.(php|html)$/i,
           loader: 'html-withimg-loader'
      }
    ]
  },
  plugins: [
    //new BundleAnalyzerPlugin(),
    //new DashboardPlugin(new Dashboard().setData),
    new Happypack({
      id: "js",
      use: [
        {
            loader:'babel-loader',
            options:{
              cacheDirectory: true,
              plugins:['@babel/plugin-transform-runtime', ['@babel/plugin-proposal-decorators', { 'legacy': true }]],
              presets: [['@babel/preset-env',{modules: false}], '@babel/preset-react']
            },
        }
      ]
    }),
    new Happypack({
      id: "eslint",
      use: [
        {
            loader: 'eslint-loader',
            options: {
                failOnError: true,        
                failOnWarning: false,
                configFile: path.resolve(__dirname, './eslintrc.js'), 
            }
        }
      ]
    }),
    new Happypack({
      id: "css",
      use: [
          "css-loader",
          "sass-loader",
      ]
    }),
    new HardSourceWebpackPlugin(),
    new SizePlugin(),
    new CaseSensitivePathsPlugin({
        debug: false,
    }),
    new webpack.ProvidePlugin({
       $: 'zepto'
    }),
    new webpack.DefinePlugin({
        API_DOMAIN: JSON.stringify(Config.isDev ? Config.DEV_API_DOMAIN : Config.PRO_API_DOMAIN),
    }),
  ],

  //devtool: 'cheap-module-source-map',
  devtool: 'source-map',
};

Helper.copyCompToDist(webpackConfig);
Helper.setEntryAndHtmlWebpackPlugin(webpackConfig);
Helper.setPluginsByEnv(webpackConfig);
webpackConfig.plugins.push(new CustomPlugin({
  commJsTpl: Config.commJs, 
}));
module.exports = webpackConfig;
//module.exports = smp.wrap(webpackConfig);
