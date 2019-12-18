const Proxy = require('express-http-proxy');

module.exports = function(app) {
    
    app.get('/admin/talent_grow/growth_value_list99', (req, res) => {
        const data = {
            test: 123,
        };
        res.json(data);
    });

    app.use('/admin/talent_grow/growth_value_list',
        Proxy('http://open.miaozhigao.babytree-dev.com', {
            proxyReqPathResolver: function(req, res) {
                return '/admin/talent_grow/growth_value_list?page=1&pagesize=20&uid=u130347417';
            },
            //preserveHostHdr: true,
            proxyReqOptDecorator: function(proxyReqOpts, originalReq) {
                return proxyReqOpts;
            }
        }));
}
