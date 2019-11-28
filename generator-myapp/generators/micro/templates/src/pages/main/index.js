import fetch from 'isomorphic-fetch';
import 'babel-polyfill';

import {
    start,
    registerMicroApps,
    setDefaultMountApp,
    runAfterFirstMounted,
} from 'qiankun';

function render({ appContent }) {
    const container = document.getElementById('container');
    container.innerHTML = appContent;
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
            entry: '//localhost:8281/static/react',
            render,
            activeRule: genActiveRule('/static/main/react'),
        },
        {
            name: 'vueapp',
            entry: '//localhost:8281/static/vue',
            render,
            activeRule: genActiveRule('/static/main/vue'),
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

setDefaultMountApp('/static/main/react');
console.log(setDefaultMountApp);
runAfterFirstMounted(() => console.info('first app mounted'));
start({ prefetch: true, fetch: request });
