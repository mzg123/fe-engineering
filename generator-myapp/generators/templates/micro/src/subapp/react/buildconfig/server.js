const Express = require('express');
const Webpack = require('webpack');
const cookie = require('cookie-parser');
const Path = require('path');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const MockApi = require('../mock/Api');

const App = Express();
const Compiler = Webpack(webpackConfig);

App.use('/static', Express.static(Path.join(process.cwd(), 'static')))
.use(WebpackDevMiddleware(Compiler, {
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/,
        poll: false
    }
}))
.use(WebpackHotMiddleware(Compiler))
.use(cookie());

MockApi(App);

App.listen(8281, err => {
    if (err) {
        throw new Error(err);
    }
});

