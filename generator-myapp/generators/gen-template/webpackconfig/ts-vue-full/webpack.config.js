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
const Helper = require('./webpackHelper');
const Common = require('./webpack.common');
const CustomPlugin = require('./webpack.custom.plugin');
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
      {
          test: /\.ts(x)?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
              appendTsSuffixTo: [/\.vue$/],
          },
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: [
            /node_modules/,
            path.resolve(Config.feParentPath, './' + Config.projectName + '/src/comp/'),
        ],
        use: "happypack/loader?id=eslint",
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new Happypack({
      id: "eslint",
      use: [
        {
            loader: 'eslint-loader',
            options: {
                fix: false,
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                failOnError: true,        
                failOnWarning: false,
                configFile: path.resolve(__dirname, './eslintrc.js'), 
            }
        }
      ]
    }),
  ],
};

module.exports = merge(Common, webpackConfig);
