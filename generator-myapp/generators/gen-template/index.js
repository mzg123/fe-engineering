var Generator = require('yeoman-generator');
var fs = require('fs');
var path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("name");
    this.t = new Template(this.options['template'], this.options['proName'] || 'app');
  }

  initializing() {
    this.log('initing...');
  }

  installingLodash() {
    //this.npmInstall(['lodash'], { 'save-dev': true });
    // this.npmInstall();
  }


  writing() {
    this.t.createTemplate();
    //const proName = this.options['proName'] || 'app';
    //this.fs.copyTpl(
    //  this.templatePath(),
    //  this.destinationPath(proName)
    //);
  }
};

class Template {
    constructor(t, dest) {
        this.dest = dest;
        this.template = t;
    }

    createTemplate() {
        //处理webpack配置
        CopyDirectory(path.resolve(__dirname, './webpackconfig/' + this.template), path.resolve(__dirname, './webpackconfig/wp'));
        //复制相同配置
        CopyDirectory(path.resolve(__dirname, '../templates/'+this.template), './'+this.dest);
        CopyDirectory(path.resolve(__dirname, './webpackconfig/wp'), './'+this.dest + '/buildconfig');
        //处理不同配置
        console.log('inited');

    }
}

function CopyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
  if (fs.existsSync(src) == false) {
    return false;
  }
  // console.log("src:" + src + ", dest:" + dest);
  // 拷贝新的内容进去
  var dirs = fs.readdirSync(src);
  dirs.forEach(function(item){
    var item_path = path.join(src, item);
    var temp = fs.statSync(item_path);
    if (temp.isFile()) { // 是文件
      //console.log("Copy File:" + item);
      fs.copyFileSync(item_path, path.join(dest, item));
    } else if (temp.isDirectory()){ // 是目录
      // console.log("Item Is Directory:" + item);
      CopyDirectory(item_path, path.join(dest, item));
    }
  });
}
