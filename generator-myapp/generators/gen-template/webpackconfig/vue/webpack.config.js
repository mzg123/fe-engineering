const fs = require('fs');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Happypack = require("happypack");
const SizePlugin = require('size-plugin');
const Dashboard = require('webpack-dashboard');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const Config = require('./baseConfig');
const Common = require('./webpack.common');
const webpackConfig = {
  resolve: {
      alias: {
          'vue': 'vue/dist/vue.esm.js',
      },
  },
  module:{
    rules:[
	{
		test: /\.vue$/,
        exclude: [
            /node_modules/,
        ],
		loader: 'vue-loader',
		options: {
			loaders: {
				'scss': [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				],
				'sass': [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		}
	},
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],

  //devtool: 'cheap-module-source-map',
  devtool: 'source-map',
};


module.exports = merge(Common, webpackConfig);
