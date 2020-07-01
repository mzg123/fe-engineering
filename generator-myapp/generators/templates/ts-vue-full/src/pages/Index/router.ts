import Router from 'vue-router';
import Vue from 'vue';
import Foo from './Foo.vue';
import Bar from './Bar.vue';

Vue.use(Router);

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
