//const fs = require('fs');
//const glob = require('glob');
const path = require('path');
//const webpack = require('webpack');
const merge = require('webpack-merge');
const Happypack = require("happypack");
//const SizePlugin = require('size-plugin');
//const Dashboard = require('webpack-dashboard');
//const TerserPlugin = require('terser-webpack-plugin');
//const DashboardPlugin = require("webpack-dashboard/plugin");
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
//const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const Config = require('./baseConfig');
//const Helper = require('./webpackHelper');
const Common = require('./webpack.common');
//const CustomPlugin = require('./webpack.custom.plugin');
const webpackConfig = {
  resolve: {
      alias: {
          '@BaseLogicObj': path.resolve(Config.feParentPath, './' + Config.projectName + '/src/comp/BaseReact/BaseLogic.js'),
          '@BaseComponent': path.resolve(Config.feParentPath, './' + Config.projectName + '/src/comp/BaseReact/BaseComponent.js'), 
          '@ErrorComponent': path.resolve(Config.feParentPath, './' + Config.projectName + '/src/comp/BaseReact/ErrorComponent.js'), 
          '@BasePureComponent': path.resolve(Config.feParentPath, './' + Config.projectName + '/src/comp/BaseReact/BasePureComponent.js'), 
      },
  },
  module:{
    rules:[
      {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
              {
                  loader: "ts-loader"
              }
          ]
      },
      {
        test:/\.(jsx|js)$/,
        exclude:/node_modules/,
		//use: "happypack/loader?id=js",
	      use: [
		{
		    loader:'babel-loader',
		    options:{
		      cacheDirectory: true,
		      plugins:['@babel/plugin-transform-runtime', ['@babel/plugin-proposal-decorators', { 'legacy': true }]],
		      presets: [['@babel/preset-env',{modules: false}], '@babel/preset-react']
		    },
		}
	      ],
      },
    ],
  },
};

module.exports = merge(Common, webpackConfig);
//module.exports = webpackConfig;//merge(Common, webpackConfig);
