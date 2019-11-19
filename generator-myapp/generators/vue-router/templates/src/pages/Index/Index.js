import Vue from 'vue';
import '@libjs';
import '@commjs';
import './Index.scss';
import App from './App.vue';
import router from './router';

const app = new Vue({
    el: '#root',
    components: { App },
    template: '<App/>',
    router,
});

console.log(app);
