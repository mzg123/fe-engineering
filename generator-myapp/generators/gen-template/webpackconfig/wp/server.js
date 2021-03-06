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

const port = 8281;

App.use('/', Express.static(Path.join(process.cwd(), 'static/Index')))
//App.use('/static', Express.static(Path.join(process.cwd(), 'dist')))
//App.use('/dist', Express.static(Path.join(process.cwd(), 'dist')))
.use(WebpackDevMiddleware(Compiler, {
    lazy: false,
    publicPath: '/dist/',
    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/,
        poll: false
    }
}))
.use(WebpackHotMiddleware(Compiler))
.use(cookie());

MockApi(App);

App.listen(port, err => {
    if (err) {
        throw new Error(err);
    } else {
	console.log('*********************http://127.0.0.1:', port, 'is listening*************************');
    }
});

