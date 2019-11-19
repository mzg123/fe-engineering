"use strict";
const Path = require('path');
const fs = require('fs');

class HtmlWebpackCustomPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    let commJsTpl = this.options.commJsTpl || [];
    // Tap into compilation hook which gives compilation as argument to the callback function
    compiler.hooks.compilation.tap('HtmlWebpackCustomPlugin', compilation => {
      // Now we can tap into various hooks available through compilation
      //console.log(compilation.hooks);
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('HtmlWebpackCustomPlugin', (htmlPluginData, callback) => {
            const assets = htmlPluginData.assets;
            const outputName = Path.basename(htmlPluginData.outputName, '.php').split('.')[0];
            const extName = Path.extname(htmlPluginData.outputName);
            let cT = [];
            let jT = [];
            //if (outputName == commCssName) {
            //    htmlPluginData.html = htmlPluginData.html.replace('<head>', '').replace('</head>', '');
            //} 
            //for(const outputUrl of assets.js) {
                //let cssContent = fs.readFileSync(commCssTpl);
                //if (injectExclude.indexOf(outputName) == -1) {
                //if (htmlPluginData.outputName.indexOf('dist/pages') > 0) {//临时解决，处理公共php文件插入到那里的问题
                //   if (extName == '.php') {
                //        handleInsert(htmlPluginData, cT, commJsTpl);
                //   }
                //}
                handleInsert(htmlPluginData, cT, commJsTpl);
            //}
            callback(null, htmlPluginData);        
      });
    });
  }
}

module.exports = HtmlWebpackCustomPlugin;

function handleInsert(htmlPluginData, commCssTpl, commJsTpl) {
    let cssReg = /(<link)([\s+href=\".+\"\s+rel=\"stylesheet\"\s*>|\s+rel=\"stylesheet\"\s+href=\".+\"\s*>])/;
    if (cssReg.test(htmlPluginData.html) && commCssTpl.length > 0) {//包含link 引用css 放在link前
        htmlPluginData.html = htmlPluginData.html.replace(/(<link)([\s+href=\".+\"\s+rel=\"stylesheet\"\s*>|\s+rel=\"stylesheet\"\s+href=\".+\"\s*>])/, commCssTpl.join('') + '$1$2');
    } else if (htmlPluginData.html.indexOf('</head>') > -1) {//包含</head>标签放在</head>前
        htmlPluginData.html = htmlPluginData.html.replace(/\<\/head\>/, function(reg){
            return commCssTpl.join('') + reg;
        });
    } else if (htmlPluginData.html.indexOf('<body>') > -1) {//包含 <body>放在<body>前
        htmlPluginData.html = htmlPluginData.html.replace(/\<body\>/, function(reg){
            return commCssTpl.join('') + reg;
        });
    } else if (htmlPluginData.html.indexOf('<meta') > -1) {//包含<meta>放在最后一个meta后
        //此种模式node中不起作用 htmlPluginData.html = htmlPluginData.html.replace(/(.*)(<meta[^<]*>)/, '$1$2' + commCssTpl.join(''));
        let matchs = htmlPluginData.html.match(/<meta[^<]*>/g);
        let r = matchs[matchs.length - 1];
        htmlPluginData.html = htmlPluginData.html.replace(r, r + commCssTpl.join(''));
    } else if (htmlPluginData.html.indexOf('<html>') > -1) {//包含<html>放在<html>后
        htmlPluginData.html = htmlPluginData.html.replace(/\<html\>/, function(reg){
            return reg + commCssTpl.join('');
        });
    } else {//其它 放在最前边
        htmlPluginData.html = commCssTpl.join('') + htmlPluginData.html;
    }

    let jsReg = /(<script)([\s+src=\".+\"\s+type=\"text/javascript\"\s*></script>|\s+type=\"text/javascript\"\s+src=\".+\"\s*></script>])/;
    if (jsReg.test(htmlPluginData.html) && commJsTpl.length > 0) {
        htmlPluginData.html = htmlPluginData.html.replace(/(<script)([\s+src=\".+\"\s+type=\"text/javascript\"\s*></script>|\s+type=\"text/javascript\"\s+src=\".+\"\s*></script>])/, commJsTpl.join('') + '$1$2');
    } else if(htmlPluginData.html.indexOf('</body>') > -1) {//包含 </body>放在</body>后
        htmlPluginData.html = htmlPluginData.html.replace(/\<\/body\>/, function(reg){
            return reg + commJsTpl.join('');
        });
    } else if(htmlPluginData.html.indexOf('</html>') > -1) {//包含 </html>放在</html>前
        htmlPluginData.html = htmlPluginData.html.replace(/\<\/html\>/, function(reg){
            return commJsTpl.join('') + reg;
        });
    } else { //其它情况放在最后
        htmlPluginData.html = htmlPluginData.html + commJsTpl.join('');
    }
}

