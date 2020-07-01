import Vue from 'vue';
import '@libjs';
import '@commjs';
import './Index.scss';
import App from './App.vue';

const app = new Vue({
    el: '#root',
    components: { App },
    template: '<App/>',
});

console.log(app);
