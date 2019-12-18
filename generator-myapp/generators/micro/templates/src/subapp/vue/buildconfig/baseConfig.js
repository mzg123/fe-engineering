const path = require('path');
const SuperConfig = require('../../../../buildconfig/baseConfig.js');//.subapp.react;

//const phpControllerRoot = '$Preg_FE_base_path.';
const feParentPath = path.resolve(__dirname, '../../');
const projectName = path.basename(path.resolve(__dirname, '../'));
const serverPrePath = '';
const Config = {
    library: 'vueapp',
    libraryTarget: 'umd',
    isBuild: JSON.parse(process.env.npm_config_argv).original.join(' ').trim() === 'run build',
    isStart: JSON.parse(process.env.npm_config_argv).original.join(' ').trim() === 'run start'
        || JSON.parse(process.env.npm_config_argv).original.join(' ').trim() === 'start' ,
    isWatch: JSON.parse(process.env.npm_config_argv).original.join(' ').trim() === 'run watch',
    isDev: JSON.parse(process.env.npm_config_argv).original.join(' ').trim() === 'run server'
        || JSON.parse(process.env.npm_config_argv).original.join(' ').trim() === 'run buildDev',
    //devServer port
    devServerPort: 8283,
    //devServer host
    devServerHost: 'localhost',
    //dev api 域名 /* eslint-disable no-undef */
    DEV_API_DOMAIN: '',
    //pro api 域名
    PRO_API_DOMAIN: '',
    //项目名称
    projectName: projectName,
    //代码库路径
    feParentPath: feParentPath,
    //本地景台服务器路径
    localServerPath: SuperConfig.feParentPath,
    //服务器静态地址前缀
    serverPrePath: serverPrePath,
    //静态资源打包后存放目录
    staticDistPath: path.resolve(__dirname, `../../../../subdist/${projectName}`),
    //staticDistPath: path.join(SuperConfig.feParentPath, `../Static/fe/${SuperConfig.projectName}/subdist/${projectName}`),
    //publicPath 静态资源请求路径
    //publicPath: path.join(serverPrePath, `/Static/fe/${SuperConfig.projectName}/subdist/${projectName}/`),
    publicPath: '//localhost:8281/subdist/vue/',//'../../',
    //watch 目录
    //jsWatchPath: path.resolve(feParentPath, `../Static/fe/${SuperConfig.projectName}/subwatch/`),
    jsWatchPath: path.resolve(__dirname, `../../../../subwatch/${projectName}`),
    //php页面生成后存放路径
    //phpDistPath: path.resolve(SuperConfig.feParentPath, `./tmpl/fe/${SuperConfig.projectName}/subdist/${projectName}/pages/`),
    phpDistPath: path.resolve(SuperConfig.feParentPath, `../tmpl/fe/${SuperConfig.projectName}/subdist/${projectName}/pages/`),
    //php通用模版存放路径
    phpCommDistPath: path.resolve(SuperConfig.feParentPath, `../tmpl/fe/${SuperConfig.projectName}/subdist/${projectName}/`),
    //phpCommDistPath: path.resolve(SuperConfig.feParentPath, `./tmpl/fe/${SuperConfig.projectName}/subdist/${projectName}/`), 
    //html页面生成后存放路径
    //htmlDistPath: path.resolve(feParentPath, `./Static/fe/${projectName}/dist/pages/`),
    //htmlDistPath: path.resolve(__dirname, `../../../../subdist/${projectName}/pages/`),
    htmlDistPath: path.resolve(SuperConfig.feParentPath, `../Static/fe/${SuperConfig.projectName}/subdist/${projectName}/pages/`),
    //页面中使用的其他js链接
    commJs: [
      //'<script src="//static02.ba9bytreeimg.com/concat/??/img/js/myurchin.js"></script>',
      //'<script src="//static02.ba9bytreeimg.com/img/bca/tracking/0.1.16/tracking.min.js"></script>',
      //'<script src="//static02.ba9bytreeimg.com/img/bca/native/0.1.6/native.min.js"></script>',
      //'<script src="//res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>',
      //'<script src="http://static02.ba9bytreeimg.com/concat/??/static/know/base64.js"></script>'
    ],
}

module.exports = Config;
