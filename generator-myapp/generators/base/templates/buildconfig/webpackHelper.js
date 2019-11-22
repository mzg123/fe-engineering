const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const fsExtra = require('fs-extra');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeArgs = JSON.parse(process.env.npm_config_argv);
const Config = require('./baseConfig');

// 获取指定路径下的入口文件
function getEntries(globPath) {
  const files = glob.sync(globPath),
      entries = {};
  files.forEach(function(filepath) {
    const extname = path.extname(filepath);
    if (['.html', '.php'].indexOf(extname) > -1) {
        filepath = filepath.substring(filepath.lastIndexOf('src'));      
        const name = filepath.replace('src/', '').replace('pages/', '').replace('.js', '').replace(extname, '');
        //默认加载js
        let jsP = Config.feParentPath + '/' + Config.projectName + '/' + filepath.replace(extname, '.jsx');
        if (fs.existsSync(jsP.replace(path.extname(jsP), '.js'))) {
            jsP = jsP.replace(path.extname(jsP), '.js');
        }
        entries[name + extname] = {
          //pagePath: filepath,
          pagePath: Config.feParentPath + '/' + Config.projectName + '/' + filepath,
          jsName: 'pages/' + name.replace('_cn', '').replace('_en', '').replace('_hk', ''),
          //jsPath: feParentPath + '/' + projectName + '/' + filepath.replace(extname, '.js'),
          jsPath: jsP,
        };
    }
  });

  return entries;
}
const Helper = {
    //comp 复制到dist中
    copyCompToDist: function (webpackConfig) {
        const commHtmls = getEntries(path.resolve(Config.feParentPath, './' + Config.projectName + '/src/comp/**/*.php'));
        Object.keys(commHtmls).forEach(function(name) {
          const plugin = new HtmlWebpackPlugin({
            filename:  Config.phpCommDistPath + '/' + name,
            template: commHtmls[name].pagePath,
            inject: false,
          }); 
          webpackConfig.plugins.push(plugin);
        }); 
    },

    setEntryAndHtmlWebpackPlugin: function(webpackConfig) {
        const indexHtmls = getEntries(path.resolve(Config.feParentPath, './' + Config.projectName + '/src/pages/**/*.*'));
        const entryArr = [];
        Object.keys(indexHtmls).forEach(function(name) {
          const isExist = fs.existsSync(indexHtmls[name].jsPath);
          if (isExist) {
              const arr = [];
              if (Config.isDev) {
                  arr.push('webpack-hot-middleware/client');
                  arr.push(indexHtmls[name].jsPath);
              } else {
                  arr.push(indexHtmls[name].jsPath);
              }
		      webpackConfig.entry[indexHtmls[name].jsName] = arr;
          }
          const extname = path.extname(indexHtmls[name].pagePath);
          let chunks = [indexHtmls[name].jsName];
          if (extname == '.html' || extname == '.php') {
              chunks = ['comm/comm', 'lib/lib', 'style/style', indexHtmls[name].jsName];         
          }
          const plugin = new HtmlWebpackPlugin({
            filename:  (extname == '.html' ? Config.htmlDistPath : Config.phpDistPath) + '/' + name,
            template: indexHtmls[name].pagePath,
            inject: isExist,
            minify: false,
            hash: true,
            chunks: chunks,
            chunksSortMode: 'manual',
          });
          entryArr.push(plugin);
        });
        //return entryArr
        webpackConfig.plugins = webpackConfig.plugins.concat(entryArr);
    },

    setPluginsByEnv: function(webpackConfig) {
        if (Config.isBuild) {
          fsExtra.emptyDirSync(Config.staticDistPath);
          fsExtra.emptyDirSync(Config.jsWatchPath);
          fsExtra.emptyDirSync(Config.phpDistPath);
          //webpackConfig.plugins.push(
          //  new CleanWebpackPlugin(
          //    [Config.staticDistPath, Config.jsWatchPath, Config.phpDistPath],　 
          //    {
          //      root: path.resolve(Config.feParentPath),    　　　　　　　　　　
          //      verbose: false,    　　　　　　　　　　
          //      dry:   false    　　　　　　　　　　
          //    }
          //  )
          //);
          webpackConfig.plugins.push(new MiniCssExtractPlugin({filename: "[name].[contenthash:8].css"}));
        } else if (Config.isStart) {
          webpackConfig.output.publicPath = `http://${Config.devServerHost}:${Config.devServerPort}/`;
          webpackConfig.plugins.push(new MiniCssExtractPlugin({filename: "[name].css"}));
          webpackConfig.output.filename = '[name].js';
        } else if (Config.isWatch) {
          fsExtra.emptyDirSync(Config.jsWatchPath);
          fsExtra.emptyDirSync(Config.phpDistPath);
          //webpackConfig.plugins.push(
          //  new CleanWebpackPlugin(
          //    [Config.jsWatchPath, Config.phpDistPath],　 
          //    {
          //      root: path.resolve(Config.feParentPath),    　　　　　　　　　　
          //      verbose: false,    　　　　　　　　　　
          //      dry:   false    　　　　　　　　　　
          //    }
          //  )
          //);
            webpackConfig.output.publicPath = webpackConfig.output.publicPath.replace('dist\/', 'watch\/');
            webpackConfig.output.path = webpackConfig.output.path.replace('dist', 'watch');
            webpackConfig.plugins.push(new MiniCssExtractPlugin({filename: "[name].[contenthash:8].watch.css"}));
            webpackConfig.output.filename = '[name].[chunkhash:8].watch.js'; 
        }
        if (Config.isDev) {
            webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
            webpackConfig.output.filename = '[name].js';
            webpackConfig.plugins.push(new MiniCssExtractPlugin({filename: "[name].css"}));
        } else {
          webpackConfig.plugins.push(new MiniCssExtractPlugin({filename: "[name].[contenthash:8].css"}));
        }
    }
}

module.exports = Helper;
//export default Helper;
