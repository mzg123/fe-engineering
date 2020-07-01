// 此文件是业务通用层js的入口文件，统一在此文件中引入通用层其它资源
(function () {
    if (window.location.href.indexOf('hide_vcconsole') > 0) return;
    if (window.location.origin.indexOf('babytree-dev.com') > 0
        || window.location.origin.indexOf('babytree-test.com') > 0) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://webview.babytree.com/fe_static/static/fe_promo/_tool/vconsole/vconsole.min.js';
        script.onload = function () {
            const newscript = document.createElement('script');
            newscript.type = 'text/javascript';
            newscript.innerHTML = 'new window.VConsole();';
            document.body.appendChild(newscript);
        };
        document.body.appendChild(script);
    }
}());
