import fetch from 'isomorphic-fetch';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import {
    start,
    registerMicroApps,
    setDefaultMountApp,
    runAfterFirstMounted,
} from 'qiankun';

import Framework from './Framework';

function render({ appContent, loading }) {
    const container = document.getElementById('container');
    ReactDOM.render((<Framework loading={loading} content={appContent} />), container);
}

function genActiveRule(routerPrefix) {
    return location => location.pathname.startsWith(routerPrefix);
}

const request = (url) => {
    const req = fetch(url, {
        referrerPolicy: 'origin-when-cross-origin',
    });
    return req;
};

registerMicroApps(
    [
        {
            name: 'reactapp',
            //entry: '//localhost:8281/subdist/react/pages/index/',
            entry: '//open.miaozhigao.babytree-dev.com/Static/fe/micro-new/subdist/react/pages/index/index.html',
            render,
            activeRule: genActiveRule('/open/user/react'),
        },
        {
            name: 'vueapp',
            //entry: '//localhost:8281/subdist/vue/pages/index/',
            entry: '//open.miaozhigao.babytree-dev.com/Static/fe/micro-new/subdist/vue/pages/index/index.html',
            render,
            activeRule: genActiveRule('/open/user/vue'),
        },
    ],
    {
        beforeLoad: [
            (app) => {
                console.log('before load', app);
            },
        ],
        beforeMount: [
            (app) => {
                console.log('before mount', app);
            },
        ],
        afterUnmount: [
            (app) => {
                console.log('after unload', app);
            },
        ],
    },
    {
        fetch: request,
    },
);

//setDefaultMountApp('/static/main/react');
setDefaultMountApp('/open/user/react');
console.log(setDefaultMountApp);
runAfterFirstMounted(() => console.info('first app mounted'));
start({ prefetch: true, fetch: request });
