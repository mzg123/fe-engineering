import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

export default new Router({
    routes: [
        {
            path: '/foo',
            component: Foo,
        },
        {
            path: '/bar',
            component: Bar,
        },
    ],
});
